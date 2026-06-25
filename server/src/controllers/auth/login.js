const prismaDB = require("../../config/database");

const sendResponse = require("../../utils/sendResponse");

// Issue: Allow the users to login through either (email & password) | (mobileNumber & password)
const login = async (req, res, next) => {
    const { tenantId, role, mobileNumber, email, password } = req.body;

    const user = await prismaDB.user.findUniqueOrThrow({
        where: {
            tenantId_email: { tenantId, email },
            tenantId_mobileNumber: `{ tenantId, mobileNumber }`,
            passwordHash: password
        },
        include: {
            userRoles: {
                include: {
                    role: {
                        include: {
                            rolePermissions: true
                        }
                    }
                }
            }
        }
    });

    const { id, roleId, role: { rolePermissions: permissions } } = user.userRoles.find(userRole => {
        return userRole.role.name === role;
    });

    return sendResponse(res, 200, true, 'User authenticated successfully', user, null);
};

module.exports = login;