const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');
const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');

const { getRolesByTenantId } = require('../controllers/roles/getRolesByTenantId');

const { addRoleByTenantId } = require('../controllers/roles/addRoleByTenantId');
const { addRoleByTenantIdValidator } = require('../validators/roles/addRoleByTenantId');

const { updateRoleByRoleId } = require('../controllers/roles/updateRoleByRoleId');
const { updateRoleByRoleIdValidator } = require('../validators/roles/updateRoleByRoleId');


const rolesRouter = express.Router();

const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

rolesRouter.use(authorize(PERMISSIONS.ROLES.MANAGE));

rolesRouter.get('/', getRolesByTenantId);
rolesRouter.post('/', validation(addRoleByTenantIdValidator), addRoleByTenantId);
rolesRouter.patch('/', validation(updateRoleByRoleIdValidator), updateRoleByRoleId);

module.exports = { rolesRouter };