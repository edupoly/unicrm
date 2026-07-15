import { deleteCustomerByCustomerIdService } from "../../services/customers/deleteCustomerByCustomerIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const deleteCustomerByCustomerId = async (req, res, next) => {
    const { tenantId } = req.user;

    const { id } = req.body;

    const result = await deleteCustomerByCustomerIdService(tenantId, id);

    return sendResponse(res, 200, true, 'Customer removed successfully');
};

export { deleteCustomerByCustomerId };
