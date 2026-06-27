const express = require('express');

const { getRolesByTenantId } = require('../controllers/roles/getRolesByTenantId');
const { authorize } = require('../middlewares/authorize');
const { PERMISSIONS } = require('../config/permissions');

const rolesRouter = express.Router();

rolesRouter.use(authorize(PERMISSIONS.ROLES.MANAGE));

rolesRouter.get('/', getRolesByTenantId);

module.exports = { rolesRouter };