const express = require('express');

const { getGlobalPermissions } = require('../config/permissions');

const { PERMISSIONS_CONSTANTS } = require('../constants/permissions');
const { REQUEST_INPUT_PARAMS } = require('../constants/common');

const { authorize } = require('../middlewares/authorize');
const validation = require('../middlewares/validation');


const { getItemsByTenantId } = require('../controllers/items/getItemsByTenantId');

const { getItemByItemIdValidator } = require('../validators/items/getItemByItemId');
const { getItemByItemId } = require('../controllers/items/getItemByItemId');

const { deleteItemByItemIdValidator } = require('../validators/items/deleteItemByItemId');
const { deleteItemByItemId } = require('../controllers/items/deleteItemByItemId');

const { addItemsByTenantIdValidator } = require('../validators/items/addItemsByTenantId');
const { addItemsByTenantId } = require('../controllers/items/addItemByTenantId');


const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const itemsRouter = express.Router();

itemsRouter.get('/',
    authorize(PERMISSIONS.ITEMS.READ),
    getItemsByTenantId
);

itemsRouter.get('/:id',
    authorize(PERMISSIONS.ITEMS.READ),
    validation(getItemByItemIdValidator, REQUEST_INPUT_PARAMS),
    getItemByItemId
);

itemsRouter.post('/',
    authorize(PERMISSIONS.ITEMS.CREATE),
    validation(addItemsByTenantIdValidator),
    addItemsByTenantId
);

itemsRouter.delete('/',
    authorize(PERMISSIONS.ITEMS.DELETE),
    validation(deleteItemByItemIdValidator),
    deleteItemByItemId
);

module.exports = { itemsRouter };
