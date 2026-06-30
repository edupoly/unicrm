const { addRoleByTenantIdService } = require("../../services/roles/addRoleByTenantIdService");

const sendResponse = require("../../utils/common/sendResponse");
const { checkPermissionExists } = require("../../utils/common/checkPermissionExists");

const { getGlobalPermissions } = require("../../config/permissions");
const { PERMISSIONS_CONSTANTS } = require("../../constants/permissions");

const addRoleByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const { roleName, description, permissions } = req.body;

    const allPermissions = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_ARRAY);

    const allPermissionsExist = permissions.every(p => checkPermissionExists(allPermissions, p));

    if (!allPermissionsExist) {
        return sendResponse(res, 400, false,
            "Provided permissions or a permission doesn't exists"
        );
    }

    const role = await addRoleByTenantIdService(tenantId, roleName, description, permissions);

    return sendResponse(res, 201, true, 'Role created successfully', role);
};

module.exports = { addRoleByTenantId };