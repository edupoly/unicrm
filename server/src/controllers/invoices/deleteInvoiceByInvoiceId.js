import { deleteInvoiceByInvoiceIdService } from "../../services/invoices/deleteInvoiceByInvoiceIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const deleteInvoiceByInvoiceId = async (req, res, next) => {
    const { tenantId } = req.user;

    const { id } = req.body;

    const result = await deleteInvoiceByInvoiceIdService(tenantId, id);

    return sendResponse(res, 200, 'Invoice deleted successfully');
};

export { deleteInvoiceByInvoiceId };