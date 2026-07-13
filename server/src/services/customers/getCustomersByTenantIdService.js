const prismaDB = require("../../config/database");

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

module.exports = { getCustomersByTenantIdService };