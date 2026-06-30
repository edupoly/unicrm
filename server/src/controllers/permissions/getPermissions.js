const { NO_PERMISSIONS_IN_DB } = require("../../errors/common/commonValidation");
const { getPermissionsService } = require("../../services/permissions/getPermissionsService");
const sendResponse = require("../../utils/common/sendResponse");

const getPermissions = async (req, res, next) => {
    const permissions = await getPermissionsService();

    if (!permissions.length) throw new Error(NO_PERMISSIONS_IN_DB);

    return sendResponse(res, 200, true, 'Permissions fetched successfully', permissions);
};

module.exports = { getPermissions };