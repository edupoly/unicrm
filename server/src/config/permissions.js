const { PERMISSIONS_CONSTANTS } = require("../constants/permissions");
const { NO_PERMISSIONS_IN_DB } = require("../errors/common/commonValidation");

const { getPermissionsService } = require("../services/permissions/getPermissionsService");
const { transformPermissions } = require("../utils/permissions/transformPermissions");

let PERMISSIONS_OBJ = null;
let PERMISSIONS_ARRAY = null;

const initPermissions = async () => {
    const dbPermissions = await getPermissionsService();

    if (!dbPermissions || !Array.isArray(dbPermissions) || dbPermissions.length === 0) {
        return console.log(NO_PERMISSIONS_IN_DB);
    }

    PERMISSIONS_ARRAY = dbPermissions;
    PERMISSIONS_OBJ = transformPermissions(dbPermissions);
};

const getGlobalPermissions = (type) => {
    if (!PERMISSIONS_OBJ || !PERMISSIONS_ARRAY || PERMISSIONS_ARRAY.length === 0) {
        throw new Error(NO_PERMISSIONS_IN_DB);
    }
    return type === PERMISSIONS_CONSTANTS.GLOBAL_PERMISSIONS_OBJ
        ? PERMISSIONS_OBJ
        : PERMISSIONS_ARRAY;
};

module.exports = { getGlobalPermissions, initPermissions };