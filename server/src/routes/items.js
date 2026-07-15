import express from 'express';

import { getGlobalPermissions } from '../config/permissions.js';

import { PERMISSIONS_CONSTANTS } from '../constants/permissions.js';
import { REQUEST_INPUT_PARAMS } from '../constants/common.js';

import { authorize } from '../middlewares/authorize.js';
import validation from '../middlewares/validation.js';


import { getItemsByTenantId } from '../controllers/items/getItemsByTenantId.js';

import { getItemByItemIdValidator } from '../validators/items/getItemByItemId.js';
import { getItemByItemId } from '../controllers/items/getItemByItemId.js';

import { deleteItemByItemIdValidator } from '../validators/items/deleteItemByItemId.js';
import { deleteItemByItemId } from '../controllers/items/deleteItemByItemId.js';

import { addItemsByTenantIdValidator } from '../validators/items/addItemsByTenantId.js';
import { addItemsByTenantId } from '../controllers/items/addItemByTenantId.js';

import { updateItemByItemIdValidator } from '../validators/items/updateItemByItemId.js';
import { updateItemByItemId } from '../controllers/items/updateItemByItemId.js';


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

itemsRouter.patch('/',
    authorize(PERMISSIONS.ITEMS.UPDATE),
    validation(updateItemByItemIdValidator),
    updateItemByItemId
);

itemsRouter.delete('/',
    authorize(PERMISSIONS.ITEMS.DELETE),
    validation(deleteItemByItemIdValidator),
    deleteItemByItemId
);

export { itemsRouter };
