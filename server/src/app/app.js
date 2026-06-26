const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const authRouter = require('../routes/auth');
const errorHandler = require('../middlewares/errorHandler');


// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.use(cookieParser());

// routes
app.use('/auth', authRouter);

// error handler
app.use(errorHandler);

module.exports = app;