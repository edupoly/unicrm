import prismaDB from "../../config/database.js";

const deleteCustomerByCustomerIdService = async (tenantId, customerId) => {
    const result = await prismaDB.customer.delete({
        where: { tenantId, id: customerId }
    });
    return result;
};

export { deleteCustomerByCustomerIdService };
