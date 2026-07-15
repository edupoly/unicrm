import prismaDB from "../../config/database.js";

const updateCustomerByCustomerIdService = async (tenantId, customerId, toUpdateData) => {
    const updatedCustomer = await prismaDB.customer.update({
        data: toUpdateData,
        where: { tenantId, id: customerId },
        omit: {
            tenantId: true,
            createdBy: true,
            updatedBy: true,
        },
        include: {
            creator: {
                select: { name: true }
            },
            updater: {
                select: { name: true }
            }
        }
    });
    return updatedCustomer;
};

export { updateCustomerByCustomerIdService };
