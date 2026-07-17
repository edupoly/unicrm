import prismaDB from "../../config/database.js";

const getInvoicesByTenantIdService = async (tenantId) => {
    const invoices = await prismaDB.invoice.findMany({
        where: { tenantId },
        omit: {
            tenantId: true,
            customerId: true,
            createdBy: true,
            updatedBy: true
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    mobileNumber: true,
                    email: true
                }
            },
            creator: {
                select: {
                    name: true
                }
            },
            updater: {
                select: {
                    name: true
                }
            },
            items: {
                omit: {
                    invoiceId: true
                }
            }
        }
    });
    return invoices;
};

export { getInvoicesByTenantIdService };