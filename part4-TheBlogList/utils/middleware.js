const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const User = require('../models/user');
const logger = require('./logger');

/** {@link https://github.com/expressjs/morgan#app List all available format supported} */
const MORGAN_FORMAT = 'tiny';

morgan.token('body', (req) => (req.body ? JSON.stringify(req.body) : '-'));

const morganMiddleware = morgan(MORGAN_FORMAT);

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    response.status(401).json({ error: 'token invalid' });
    return;
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    response.status(401).json({ error: `seem like this user with id ${decodedToken.id} doesn't exist` });
    return;
  }
  request.user = user;
  next();
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};
module.exports = {
  unknownEndpoint,
  errorHandler,
  morganMiddleware,
  tokenExtractor,
  userExtractor,
};
