import { deleteItemByItemIdService } from "../../services/items/deleteItemByItemIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const deleteItemByItemId = async (req, res, next) => {
    const { tenantId } = req.user;
    const { id } = req.body;

    const result = await deleteItemByItemIdService(tenantId, id);

    return sendResponse(res, 200, true, 'Item deleted successfully');
};

export { deleteItemByItemId };
