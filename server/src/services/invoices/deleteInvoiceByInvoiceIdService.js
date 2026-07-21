import prismaDB from "../../config/database.js";

const deleteInvoiceByInvoiceIdService = async (tenantId, invoiceId) => {
    const result = await prismaDB.invoice.delete({
        where: {
            tenantId,
            id: invoiceId
        }
    });
    return result;
};

export { deleteInvoiceByInvoiceIdService };