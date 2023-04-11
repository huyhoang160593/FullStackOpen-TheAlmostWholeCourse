const morgan = require('morgan');
const logger = require('./logger');

/** {@link https://github.com/expressjs/morgan#app List all available format supported} */
const MORGAN_FORMAT = 'tiny';

morgan.token('body', (req) => (req.body ? JSON.stringify(req.body) : '-'));

const morganMiddleware = morgan(MORGAN_FORMAT);

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
  }

  return next(error);
};
module.exports = {
  unknownEndpoint,
  errorHandler,
  morganMiddleware,
};
