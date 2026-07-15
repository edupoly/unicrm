import { getGlobalPermissions } from "../../config/permissions.js";
import { PERMISSIONS_CONSTANTS } from "../../constants/permissions.js";

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

export { checkPermissionExists };
