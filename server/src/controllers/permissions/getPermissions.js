import { NO_PERMISSIONS_IN_DB } from "../../errors/common/commonValidation.js";
import { getPermissionsService } from "../../services/permissions/getPermissionsService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const getPermissions = async (req, res, next) => {
    const permissions = await getPermissionsService();

    if (!permissions.length) throw new Error(NO_PERMISSIONS_IN_DB);

    return sendResponse(res, 200, true, 'Permissions fetched successfully', permissions);
};

export { getPermissions };
