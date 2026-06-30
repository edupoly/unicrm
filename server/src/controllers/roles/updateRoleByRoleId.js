const { getGlobalPermissions } = require("../../config/permissions");

const { PERMISSIONS_CONSTANTS } = require("../../constants/permissions");

const { updateRoleByRoleIdService } = require("../../services/roles/updateRoleByRoleIdService");

const { checkPermissionExists } = require("../../utils/common/checkPermissionExists");

const sendResponse = require("../../utils/common/sendResponse");


const updateRoleByRoleId = async (req, res, next) => {
    const { id, name, description, permissions } = req.body;

    const { tenantId } = req.user;

    if (!name && !description && !permissions) {
        return sendResponse(res, 400, false, 'At least one field should change to update the role');
    }

    if (permissions && Array.isArray(permissions)) {
        const allPermissions = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_ARRAY);

        const allPermissionsExist = permissions.every(p => checkPermissionExists(allPermissions, p));

        if (!allPermissionsExist) {
            return sendResponse(res, 400, false,
                "Provided permissions or a permission doesn't exists"
            );
        }
    }

    const updatedRole = await updateRoleByRoleIdService(tenantId, id, name, description, permissions);

    sendResponse(res, 200, true, 'Role updated successfully', { ...updatedRole });
};

module.exports = { updateRoleByRoleId };