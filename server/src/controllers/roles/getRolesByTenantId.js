import { getRolesByTenantIdService } from "../../services/roles/getRolesByTenantIdService.js";

import sendResponse from "../../utils/common/sendResponse.js";

const getRolesByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const roles = await getRolesByTenantIdService(tenantId);
    
    return sendResponse(res, 200, true, 'Roles fetched successfully', roles);
};

export { getRolesByTenantId };
