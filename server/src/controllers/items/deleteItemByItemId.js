const { deleteItemByItemIdService } = require("../../services/items/deleteItemByItemIdService");
const sendResponse = require("../../utils/common/sendResponse");

const deleteItemByItemId = async (req, res, next) => {
    const { tenantId } = req.user;
    const { id } = req.body;

    const result = await deleteItemByItemIdService(tenantId, id);

    return sendResponse(res, 200, true, 'Item deleted successfully');
};

module.exports = { deleteItemByItemId };