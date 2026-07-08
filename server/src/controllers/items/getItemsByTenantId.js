const { getItemsByTenantIdService } = require("../../services/items/getItemsByTenantIdService");
const sendResponse = require("../../utils/common/sendResponse");

const getItemsByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const items = await getItemsByTenantIdService(tenantId);

    return sendResponse(res, 200, true, 'Items fetched successfully', items);
};

module.exports = { getItemsByTenantId };