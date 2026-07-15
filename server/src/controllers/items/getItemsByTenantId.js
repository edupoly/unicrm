import { getItemsByTenantIdService } from "../../services/items/getItemsByTenantIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const getItemsByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const items = await getItemsByTenantIdService(tenantId);

    return sendResponse(res, 200, true, 'Items fetched successfully', items);
};

export { getItemsByTenantId };
