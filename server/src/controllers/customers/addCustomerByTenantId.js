const { addCustomerByTenantIdService } = require("../../services/customers/addCustomerByTenantIdService");
const sendResponse = require("../../utils/common/sendResponse");

const addCustomerByTenantId = async (req, res, next) => {
    const { tenantId, userId } = req.user;

    const { name, mobileNumber, email, address, customFields } = req.body;

    const customer = await addCustomerByTenantIdService(tenantId, userId, name,
        mobileNumber, email, address, customFields);

    return sendResponse(res, 201, true, 'Customer created successfully', customer);
};

module.exports = { addCustomerByTenantId };