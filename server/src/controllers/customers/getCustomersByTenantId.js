const { getCustomersByTenantIdService } = require("../../services/customers/getCustomersByTenantIdService");
const sendResponse = require("../../utils/common/sendResponse");

const getCustomersByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const customers = await getCustomersByTenantIdService(tenantId);

    return sendResponse(res, 200,
        true,
        `${customers.length} customers fetched successfully`,
        customers
    );
};

module.exports = { getCustomersByTenantId };