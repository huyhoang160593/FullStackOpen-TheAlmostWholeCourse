const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');
const { morganMiddleware, errorHandler, unknownEndpoint } = require('./utils/middleware');
/* NOTES: make sure this below library will be import before any router require or else the
 * error will not be pass
 */
require('express-async-errors');
const blogsRouter = require('./controllers/blogs');

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

app.use('/api/blogs', blogsRouter);

app.use(errorHandler);
app.use(unknownEndpoint);
module.exports = app;
