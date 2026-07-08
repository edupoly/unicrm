const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');

const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');
const { REQUEST_INPUT_PARAMS } = require('../constants/common');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');

const { getItemsByTenantId } = require('../controllers/items/getItemsByTenantId');

const { getItemByItemIdValidator } = require('../validators/items/getItemByItemId');
const { getItemByItemId } = require('../controllers/items/getItemByItemId');


const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const itemsRouter = express.Router();


itemsRouter.get('/', authorize(PERMISSIONS.ITEMS.READ), getItemsByTenantId);

itemsRouter.get('/:id',
    authorize(PERMISSIONS.ITEMS.READ),
    validation(getItemByItemIdValidator, REQUEST_INPUT_PARAMS),
    getItemByItemId
);

module.exports = { itemsRouter };
