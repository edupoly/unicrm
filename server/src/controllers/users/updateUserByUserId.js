import bcrypt from 'bcrypt';

import { updateUserByUserIdService } from '../../services/users/updateUserByUserIdService.js';
import sendResponse from '../../utils/common/sendResponse.js';
import { checkAllRolesExist } from '../../utils/common/checkRoleExists.js';

const { BCRYPT_SALT_ROUNDS } = process.env;

/*
 * Input:  req.body { id, name?, mobileNumber?, email?, password?, roleIds?: [...] }
 *         req.user.tenantId (from JWT)
 * Output: 200 { success, message, data: { id, name, mobileNumber, email } }
 */
const updateUserByUserId = async (req, res, next) => {
  const { tenantId } = req.user;

  const { id, name, mobileNumber, email, password, roleIds } = req.body;

  if (!name && !mobileNumber && !email && !password && !roleIds) {
    return sendResponse(res, 400, false, 'At least one field should change to update the user');
  }

  if (roleIds) {
    const allRolesExist = await checkAllRolesExist(roleIds);

    if (!allRolesExist) {
      return sendResponse(res, 400, false, "One or more provided roles don't exist");
    }
  }

  const passwordHash = password ? await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS)) : undefined;

  const data = { name, mobileNumber, email, passwordHash, roleIds };

  const user = await updateUserByUserIdService(tenantId, id, data);

  return sendResponse(res, 200, true, 'User updated successfully', user);
};

export { updateUserByUserId };
