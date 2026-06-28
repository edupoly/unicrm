const express = require('express');

const { PERMISSIONS } = require('../config/permissions');
const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');

const { getRolesByTenantId } = require('../controllers/roles/getRolesByTenantId');

const { addRoleByTenantId } = require('../controllers/roles/addRoleByTenantId');
const addRoleByTenantIdValidator = require('../validators/roles/addRoleByTenantId');

const rolesRouter = express.Router();

rolesRouter.use(authorize(PERMISSIONS.ROLES.MANAGE));

rolesRouter.get('/', getRolesByTenantId);
rolesRouter.post('/', validation(addRoleByTenantIdValidator), addRoleByTenantId);

module.exports = { rolesRouter };