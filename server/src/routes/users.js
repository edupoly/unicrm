const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');
const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');

const { addUserByTenantId } = require('../controllers/users/addUserByTenantId');
const { addUserByTenantIdValidator } = require('../validators/users/addUserByTenantId');


const { getUserByTenantId } = require('../controllers/users/getUserByTenantId');


const { updateUserByUserId } = require('../controllers/users/updateUserByUserId');
const { updateUserByUserIdValidator } = require('../validators/users/updateUserByUserId');


const { deleteUserByUserId } = require('../controllers/users/deleteUserByUserId');
const { deleteUserByUserIdValidator } = require('../validators/users/deleteUserByUserId');



const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const usersRouter = express.Router();

usersRouter.post('/',authorize(PERMISSIONS.USERS.CREATE), validation(addUserByTenantIdValidator), addUserByTenantId);

usersRouter.get('/',authorize(PERMISSIONS.USERS.READ), getUserByTenantId);

usersRouter.patch('/',authorize(PERMISSIONS.USERS.UPDATE), validation(updateUserByUserIdValidator), updateUserByUserId);

usersRouter.delete('/',authorize(PERMISSIONS.USERS.DELETE), validation(deleteUserByUserIdValidator), deleteUserByUserId);


module.exports = { usersRouter };