const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');
const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');

const { addUserByTenantId } = require('../controllers/users/addUserByTenantId');
const { addUserByTenantIdValidator } = require('../validators/users/addUserByTenantIdValidator');



const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const usersRouter = express.Router();

usersRouter.post('/', authorize(PERMISSIONS.USERS.CREATE), validation(addUserByTenantIdValidator), addUserByTenantId);