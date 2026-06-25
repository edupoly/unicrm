const express = require('express');
const morgan = require('morgan');

const app = express();

const authRouter = require('../routes/auth');
const errorHandler = require('../middlewares/errorHandler');


// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/auth', authRouter);

// error handler
app.use(errorHandler);

module.exports = app;