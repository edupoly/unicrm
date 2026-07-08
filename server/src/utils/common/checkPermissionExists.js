const { getGlobalPermissions } = require("../../config/permissions");
const { PERMISSIONS_CONSTANTS } = require("../../constants/permissions");

const checkPermissionExists = (
    permission,
    allPermissions = getGlobalPermissions(PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_ARRAY)
) => {
    const isPermissionExists = allPermissions.some(p => {
        return p.id === permission.id
            && p.name === permission.name
            && p.resource === permission.resource
            && p.description === permission.description;
    });
    return isPermissionExists;
};

module.exports = { checkPermissionExists };