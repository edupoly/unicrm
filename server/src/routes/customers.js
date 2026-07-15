import express from 'express';

import { getGlobalPermissions } from '../config/permissions.js';

import { PERMISSIONS_CONSTANTS } from '../constants/permissions.js';
import { REQUEST_INPUT_PARAMS } from '../constants/common.js';

import { authorize } from '../middlewares/authorize.js';
import validation from '../middlewares/validation.js';


import { getCustomersByTenantId } from '../controllers/customers/getCustomersByTenantId.js';

import { getCustomerByEmailOrMobileNumberValidator } from '../validators/customers/getCustomerByEmailOrMobileNumber.js';
import { getCustomerByEmailOrMobileNumber } from '../controllers/customers/getCustomerByEmailOrMobileNumber.js';

import { addCustomerByTenantIdValidator } from '../validators/customers/addCustomerByTenantId.js';
import { addCustomerByTenantId } from '../controllers/customers/addCustomerByTenantId.js';

import { deleteCustomerByCustomerIdValidator } from '../validators/customers/deleteCustomerByCustomerId.js';
import { deleteCustomerByCustomerId } from '../controllers/customers/deleteCustomerByCustomerId.js';

import { updateCustomerByCustomerIdValidator } from '../validators/customers/updateCustomerByCustomerId.js';
import { updateCustomerByCustomerId } from '../controllers/customers/updateCustomerByCustomerId.js';


const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);


const customersRouter = express.Router();

customersRouter.get('/',
    authorize(PERMISSIONS.CUSTOMERS.READ),
    getCustomersByTenantId
);

customersRouter.get('/find-by-email-or-mobile',
    authorize(PERMISSIONS.CUSTOMERS.READ),
    validation(getCustomerByEmailOrMobileNumberValidator),
    getCustomerByEmailOrMobileNumber
);

customersRouter.post('/',
    authorize(PERMISSIONS.CUSTOMERS.CREATE),
    validation(addCustomerByTenantIdValidator),
    addCustomerByTenantId
);

customersRouter.patch('/',
    authorize(PERMISSIONS.CUSTOMERS.UPDATE),
    validation(updateCustomerByCustomerIdValidator),
    updateCustomerByCustomerId
);

customersRouter.delete('/',
    authorize(PERMISSIONS.CUSTOMERS.DELETE),
    validation(deleteCustomerByCustomerIdValidator),
    deleteCustomerByCustomerId
);

export { customersRouter };
