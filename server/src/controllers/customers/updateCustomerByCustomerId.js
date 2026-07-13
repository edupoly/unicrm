const sendResponse = require("../../utils/common/sendResponse");
const { updateCustomerByCustomerIdService } = require("../../services/customers/updateCustomerByCustomerIdService");

const updateCustomerByCustomerId = async (req, res, next) => {
    const { tenantId, userId } = req.user;

    const { id, ...toUpdateCustomer } = req.body;

    if (!Object.keys(toUpdateCustomer).length) {
        return sendResponse(
            res,
            400,
            false,
            'At least one field should change to update the customer'
        );
    }

    toUpdateCustomer.updatedBy = userId;

    const updatedCustomer = await updateCustomerByCustomerIdService(tenantId, id, toUpdateCustomer);

    return sendResponse(res, 200, true, 'Customer updated successfully', updatedCustomer);
};

module.exports = { updateCustomerByCustomerId };