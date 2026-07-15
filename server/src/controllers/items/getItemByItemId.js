import { getItemByItemIdService } from "../../services/items/getItemByItemIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const getItemByItemId = async (req, res, next) => {
    const { id: itemId } = req.params;

    const { tenantId } = req.user;

    const item = await getItemByItemIdService(itemId, tenantId);

    return sendResponse(res, 200, true, 'Item fetched successfully', item);
};

export { getItemByItemId };
