import { USER_SESSION_COOKIE_NAME } from "../constants/auth.js";

import { verifyJwtToken } from "../utils/common/createVerifyJwtToken.js";

import sendResponse from "../utils/common/sendResponse.js";
import { checkPermissionExists } from "../utils/common/checkPermissionExists.js";


const authorize = (permission) => {
    return (req, res, next) => {
        const token = req.cookies[USER_SESSION_COOKIE_NAME];

        if (!token) {
            return sendResponse(res, 401, false, 'Access Denied: Token is missing');
        }

        const tokenPayload = verifyJwtToken(token);

        if (!tokenPayload) {
            return sendResponse(res, 403, false, 'Access Denied: Token got expired or modified');
        }

        const { userId, tenantId, permissions } = tokenPayload;

        if (!userId || !tenantId) {
            return sendResponse(res, 401, false, 'Access Denied: Token has missing fields');
        }

        if (!permissions || !(Array.isArray(permissions))) {
            return sendResponse(res, 403, false, `Access Denied: Permissions doesn't exists`);
        }

        const hasPermission = checkPermissionExists(permission, permissions);

        if (!hasPermission) {
            return sendResponse(res, 403, false, `Access Denied: You don't have permission`);
        }

        req.user = { userId, tenantId, permissions };

        next();
    }
};

export { authorize };
