const { deleteUserByUserIdService } = require("../../services/users/deleteUserByUserIdService");
const sendResponse = require("../../utils/common/sendResponse");

/*
 * Input:  req.body { id: string (userId UUID) }
 *         req.user.tenantId (from JWT)
 * Output: 204 { success, message }
 */
const deleteUserByUserId = async (req, res, next) => {
    const { id } = req.body;

    const { tenantId } = req.user;

    await deleteUserByUserIdService(tenantId, id);

    return sendResponse(res, 200, true, 'User removed successfully');
};

module.exports = { deleteUserByUserId };
