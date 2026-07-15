import prismaDB from "../../config/database.js";

const getCustomersByTenantIdService = async (tenantId) => {
    const customers = await prismaDB.customer.findMany({
        where: { tenantId },
        omit: {
            tenantId: true,
            createdBy: true,
            updatedBy: true
        },
        include: {
            creator: {
                select: {
                    name: true
                }
            },
            updater: {
                select: {
                    name: true
                }
            }
        }
    });
    return customers;
};

export { getCustomersByTenantIdService };
