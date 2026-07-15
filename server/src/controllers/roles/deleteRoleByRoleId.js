import { deleteRoleByRoleIdService } from "../../services/roles/deleteRoleByRoleIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const deleteRoleByRoleId = async (req, res, next) => {
    const { id } = req.body;

    const { tenantId } = req.user;

    const result = await deleteRoleByRoleIdService(tenantId, id);

    return sendResponse(res, 200, true, 'Role removed successfully');
};

export { deleteRoleByRoleId };
