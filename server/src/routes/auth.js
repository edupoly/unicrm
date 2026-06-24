const express = require('express');
const login = require('../controllers/auth/login');

const authRouter = express.Router();

authRouter.post('/login', login);

module.exports = authRouter;