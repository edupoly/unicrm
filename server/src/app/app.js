const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const { authRouter } = require('../routes/auth');
const { permissionsRouter } = require('../routes/permissions');
const { rolesRouter } = require('../routes/roles');
const { usersRouter } = require('../routes/users');
const { itemsRouter } = require('../routes/items');

const errorHandler = require('../middlewares/errorHandler');

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);
app.use('/api/permissions', permissionsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);

// error handler
app.use(errorHandler);

module.exports = app;