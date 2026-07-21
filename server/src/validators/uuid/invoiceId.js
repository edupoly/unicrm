import z from "zod";
import { INVALID_INVOICE_ID, REQUIRED_INVOICE_ID } from "../../errors/uuid/invoiceId.js";

const invoiceIdValidator = z
    .string(REQUIRED_INVOICE_ID)
    .uuid(INVALID_INVOICE_ID);

export default invoiceIdValidator;