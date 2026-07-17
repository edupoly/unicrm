import { getInvoicesByTenantIdService } from "../../services/invoices/getInvoicesByTenantIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const getInvoicesByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const invoices = await getInvoicesByTenantIdService(tenantId);

    return sendResponse(res, 200, true, `${invoices.length} invoices fetched successfully`, invoices);
};

export { getInvoicesByTenantId };