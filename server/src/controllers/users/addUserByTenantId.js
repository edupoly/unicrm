const bcrypt = require('bcrypt');

const { addUserByTenantIdService } = require('../../services/users/addUserByTenantIdService');
const sendResponse = require('../../utils/common/sendResponse');
const { checkAllRolesExist } = require('../../utils/common/checkRoleExists');

const { BCRYPT_SALT_ROUNDS } = process.env;

/*
 * Input:  req.body { name, mobileNumber, email, password, roleIds: [...] }
 *         req.user.tenantId (from JWT)
 * Output: 201 { success, message, data: { id, name, mobileNumber, email } }
 */
const addUserByTenantId = async (req, res, next) => {
  const { tenantId } = req.user;

  const { name, mobileNumber, email, password, roleIds } = req.body;

  const allRolesExist = await checkAllRolesExist(roleIds);

  if (!allRolesExist) {
    return sendResponse(res, 400, false, "One or more provided roles don't exist");
  }

  const passwordHash = await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS));

  const user = await addUserByTenantIdService(tenantId, name, mobileNumber, email, passwordHash, roleIds);

  return sendResponse(res, 201, true, 'User created successfully', user);
};

module.exports = { addUserByTenantId };
