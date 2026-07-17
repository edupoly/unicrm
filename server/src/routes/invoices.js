import express from 'express';

import { getGlobalPermissions } from '../config/permissions.js';

import { PERMISSIONS_CONSTANTS } from '../constants/permissions.js';
import { REQUEST_INPUT_PARAMS } from '../constants/common.js';

import { authorize } from '../middlewares/authorize.js';

import validation from '../middlewares/validation.js';

import { getInvoicesByTenantId } from '../controllers/invoices/getInvoicesByTenantId.js';


const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const invoicesRouter = express.Router();

invoicesRouter.get('/',
    authorize(PERMISSIONS.INVOICES.READ),
    getInvoicesByTenantId
);

export { invoicesRouter };