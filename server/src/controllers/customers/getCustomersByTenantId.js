import { getCustomersByTenantIdService } from "../../services/customers/getCustomersByTenantIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const getCustomersByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const customers = await getCustomersByTenantIdService(tenantId);

    return sendResponse(res, 200,
        true,
        `${customers.length} customers fetched successfully`,
        customers
    );
};

export { getCustomersByTenantId };
