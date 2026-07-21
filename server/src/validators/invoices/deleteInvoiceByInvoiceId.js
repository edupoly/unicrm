import z from "zod";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";
import invoiceIdValidator from "../uuid/invoiceId.js";

const deleteInvoiceByInvoiceIdValidator = z.object({
    id: invoiceIdValidator
}, REQUIRED_OBJECT).strict();

export { deleteInvoiceByInvoiceIdValidator };