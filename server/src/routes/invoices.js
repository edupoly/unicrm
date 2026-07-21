import express from 'express';

import { getGlobalPermissions } from '../config/permissions.js';

import { PERMISSIONS_CONSTANTS } from '../constants/permissions.js';
import { REQUEST_INPUT_PARAMS } from '../constants/common.js';

import { authorize } from '../middlewares/authorize.js';

import validation from '../middlewares/validation.js';

import { getInvoicesByTenantId } from '../controllers/invoices/getInvoicesByTenantId.js';
import { deleteInvoiceByInvoiceIdValidator } from '../validators/invoices/deleteInvoiceByInvoiceId.js';
import { deleteInvoiceByInvoiceId } from '../controllers/invoices/deleteInvoiceByInvoiceId.js';


const PERMISSIONS = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ);

const invoicesRouter = express.Router();

invoicesRouter.get('/',
    authorize(PERMISSIONS.INVOICES.READ),
    getInvoicesByTenantId
);

invoicesRouter.delete('/',
    authorize(PERMISSIONS.INVOICES.DELETE),
    validation(deleteInvoiceByInvoiceIdValidator),
    deleteInvoiceByInvoiceId
);

export { invoicesRouter };