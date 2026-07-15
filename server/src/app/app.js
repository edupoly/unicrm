import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

import { authRouter } from '../routes/auth.js';
import { permissionsRouter } from '../routes/permissions.js';
import { rolesRouter } from '../routes/roles.js';
import { usersRouter } from '../routes/users.js';
import { itemsRouter } from '../routes/items.js';

import errorHandler from '../middlewares/errorHandler.js';
import { customersRouter } from '../routes/customers.js';

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
app.use('/api/customers', customersRouter);

// error handler
app.use(errorHandler);

export default app;
