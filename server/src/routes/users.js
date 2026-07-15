import express from 'express';

import { getGlobalPermissions } from '../config/permissions.js';
import { PERMISSIONS_CONSTANTS } from '../constants/permissions.js';

import { authorize } from '../middlewares/authorize.js';
import validation from '../middlewares/validation.js';

import { addUserByTenantId } from '../controllers/users/addUserByTenantId.js';
import { addUserByTenantIdValidator } from '../validators/users/addUserByTenantId.js';


import { getUserByTenantId } from '../controllers/users/getUserByTenantId.js';


import { updateUserByUserId } from '../controllers/users/updateUserByUserId.js';
import { updateUserByUserIdValidator } from '../validators/users/updateUserByUserId.js';


import { deleteUserByUserId } from '../controllers/users/deleteUserByUserId.js';
import { deleteUserByUserIdValidator } from '../validators/users/deleteUserByUserId.js';



const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const usersRouter = express.Router();

usersRouter.post('/',authorize(PERMISSIONS.USERS.CREATE), validation(addUserByTenantIdValidator), addUserByTenantId);

usersRouter.get('/',authorize(PERMISSIONS.USERS.READ), getUserByTenantId);

usersRouter.patch('/',authorize(PERMISSIONS.USERS.UPDATE), validation(updateUserByUserIdValidator), updateUserByUserId);

usersRouter.delete('/',authorize(PERMISSIONS.USERS.DELETE), validation(deleteUserByUserIdValidator), deleteUserByUserId);


export { usersRouter };
