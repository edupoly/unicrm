const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');

const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');
const { REQUEST_INPUT_PARAMS } = require('../constants/common');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');


const { getCustomersByTenantId } = require('../controllers/customers/getCustomersByTenantId');

const { getCustomerByEmailOrMobileNumberValidator } = require('../validators/customers/getCustomerByEmailOrMobileNumber');
const { getCustomerByEmailOrMobileNumber } = require('../controllers/customers/getCustomerByEmailOrMobileNumber');

const { addCustomerByTenantIdValidator } = require('../validators/customers/addCustomerByTenantId');
const { addCustomerByTenantId } = require('../controllers/customers/addCustomerByTenantId');

const { deleteCustomerByCustomerIdValidator } = require('../validators/customers/deleteCustomerByCustomerId');
const { deleteCustomerByCustomerId } = require('../controllers/customers/deleteCustomerByCustomerId');

const { updateCustomerByCustomerIdValidator } = require('../validators/customers/updateCustomerByCustomerId');
const { updateCustomerByCustomerId } = require('../controllers/customers/updateCustomerByCustomerId');


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

module.exports = { customersRouter };