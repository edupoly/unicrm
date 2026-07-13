const { deleteCustomerByCustomerIdService } = require("../../services/customers/deleteCustomerByCustomerIdService");
const sendResponse = require("../../utils/common/sendResponse");

const deleteCustomerByCustomerId = async (req, res, next) => {
    const { tenantId } = req.user;

    const { id } = req.body;

    const result = await deleteCustomerByCustomerIdService(tenantId, id);

    return sendResponse(res, 200, true, 'Customer removed successfully');
};

module.exports = { deleteCustomerByCustomerId };