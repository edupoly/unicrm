const { deleteRoleByRoleIdService } = require("../../services/roles/deleteRoleByRoleIdService");
const sendResponse = require("../../utils/common/sendResponse");

const deleteRoleByRoleId = async (req, res, next) => {
    const { id } = req.body;

    const { tenantId } = req.user;

    const result = await deleteRoleByRoleIdService(tenantId, id);

    return sendResponse(res, 204, true, 'Role removed successfully');
};

module.exports = { deleteRoleByRoleId };