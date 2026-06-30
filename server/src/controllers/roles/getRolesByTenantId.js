const { getRolesByTenantIdService } = require("../../services/roles/getRolesByTenantIdService");

const sendResponse = require("../../utils/common/sendResponse");

const getRolesByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const roles = await getRolesByTenantIdService(tenantId);
    
    return sendResponse(res, 200, true, 'Roles fetched successfully', roles);
};

module.exports = { getRolesByTenantId };