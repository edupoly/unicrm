const { USER_SESSION_COOKIE_NAME } = require("../constants/auth");

const { verifyJwtToken } = require("../utils/common/createVerifyJwtToken");

const sendResponse = require("../utils/common/sendResponse");


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

        if (!permissions || !(Array.isArray(permissions))) {
            return sendResponse(res, 403, false, `Access Denied: Permissions doesn't exists`);
        }

        const hasPermission = permissions.find(p => {
            return permission.name === p.name
                && permission.resource === p.resource
                && permission.description === p.description
        });

        if (!hasPermission) {
            return sendResponse(res, 403, false, `Access Denied: You don't have permission`);
        }

        req.user = { userId, tenantId, permissions };

        next();
    }
};

module.exports = { authorize };