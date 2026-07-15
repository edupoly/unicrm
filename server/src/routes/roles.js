import express from 'express';

import { getGlobalPermissions } from '../config/permissions.js';
import { PERMISSIONS_CONSTANTS } from '../constants/permissions.js';

import { authorize } from '../middlewares/authorize.js';
import validation from '../middlewares/validation.js';


import { getRolesByTenantId } from '../controllers/roles/getRolesByTenantId.js';

import { addRoleByTenantId } from '../controllers/roles/addRoleByTenantId.js';
import { addRoleByTenantIdValidator } from '../validators/roles/addRoleByTenantId.js';

import { updateRoleByRoleId } from '../controllers/roles/updateRoleByRoleId.js';
import { updateRoleByRoleIdValidator } from '../validators/roles/updateRoleByRoleId.js';

import { deleteRoleByRoleId } from '../controllers/roles/deleteRoleByRoleId.js';
import { deleteRoleByRoleIdValidator } from '../validators/roles/deleteRoleByRoleId.js';


const rolesRouter = express.Router();

const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

rolesRouter.use(authorize(PERMISSIONS.ROLES.MANAGE));

rolesRouter.get('/', getRolesByTenantId);
rolesRouter.post('/', validation(addRoleByTenantIdValidator), addRoleByTenantId);
rolesRouter.patch('/', validation(updateRoleByRoleIdValidator), updateRoleByRoleId);
rolesRouter.delete('/', validation(deleteRoleByRoleIdValidator), deleteRoleByRoleId);

export { rolesRouter };
