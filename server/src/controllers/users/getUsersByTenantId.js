import { getUsersByTenantIdService } from "../../services/users/getUsersByTenantIdService.js";

import sendResponse from "../../utils/common/sendResponse.js";

/*
 * Input:  req.user.tenantId (from JWT)
 * Output: 200 { success, message, data: [{ id, name, mobileNumber, email, createdAt, userRoles }] }
 */
const getUserByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const users = await getUsersByTenantIdService(tenantId);

    return sendResponse(res, 200, true, 'Users fetched successfully', users);
};

export { getUserByTenantId };
