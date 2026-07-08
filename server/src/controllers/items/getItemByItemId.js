const { getItemByItemIdService } = require("../../services/items/getItemByItemIdService");
const sendResponse = require("../../utils/common/sendResponse");

const getItemByItemId = async (req, res, next) => {
    const { id: itemId } = req.params;

    const { tenantId } = req.user;

    const item = await getItemByItemIdService(itemId, tenantId);

    return sendResponse(res, 200, true, 'Item fetched successfully', item);
};

module.exports = { getItemByItemId };