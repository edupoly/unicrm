const bcrypt = require('bcrypt');

const { updateUserByUserIdService } = require('../../services/users/updateUserByUserIdService');
const sendResponse = require('../../utils/common/sendResponse');
const { checkAllRolesExist } = require('../../utils/common/checkRoleExists');

const { BCRYPT_SALT_ROUNDS } = process.env;

/*
 * Input:  req.body { id, name?, mobile?, email?, password?, role_ids?: [...] }
 *         req.user.tenantId (from JWT)
 * Output: 200 { success, message, data: { id, name, mobileNumber, email } }
 */
const updateUserByUserId = async (req, res, next) => {
  const { tenantId } = req.user;

  const { id, name, mobile, email, password, role_ids } = req.body;

  if (!name && !mobile && !email && !password && !role_ids) {
    return sendResponse(res, 400, false, 'At least one field should change to update the user');
  }

  if (role_ids) {
    const allRolesExist = await checkAllRolesExist(role_ids);

    if (!allRolesExist) {
      return sendResponse(res, 400, false, "One or more provided roles don't exist");
    }
  }

  const passwordHash = password ? await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS)) : undefined;

  const data = { name, mobileNumber: mobile, email, passwordHash, roleIds: role_ids };

  const user = await updateUserByUserIdService(tenantId, id, data);

  return sendResponse(res, 200, true, 'User updated successfully', user);
};

module.exports = { updateUserByUserId };
