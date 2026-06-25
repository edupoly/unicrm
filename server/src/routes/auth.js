const express = require('express');

const validation = require('../middlewares/validation');

const login = require('../controllers/auth/login');

const loginValidator = require('../validators/auth/login');


const authRouter = express.Router();

authRouter.post('/login', validation(loginValidator), login);

module.exports = authRouter;