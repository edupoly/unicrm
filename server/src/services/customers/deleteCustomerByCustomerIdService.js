const prismaDB = require("../../config/database");

const deleteCustomerByCustomerIdService = async (tenantId, customerId) => {
    const result = await prismaDB.customer.delete({
        where: { tenantId, id: customerId }
    });
    return result;
};

module.exports = { deleteCustomerByCustomerIdService };