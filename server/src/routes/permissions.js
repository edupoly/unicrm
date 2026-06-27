const express = require('express');

const { getPermissions } = require('../controllers/permissions/getPermissions');

const permissionsRouter = express.Router();

permissionsRouter.get('/', getPermissions);

module.exports = { permissionsRouter };