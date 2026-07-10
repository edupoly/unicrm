const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');

const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');
const { REQUEST_INPUT_PARAMS } = require('../constants/common');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');

const { getCustomersByTenantId } = require('../controllers/customers/getCustomersByTenantId');


const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);


const customersRouter = express.Router();

customersRouter.get('/',
    authorize(PERMISSIONS.CUSTOMERS.READ),
    getCustomersByTenantId
);



module.exports = { customersRouter };