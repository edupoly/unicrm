const bcrypt = require('bcrypt');

const prismaDB = require("../../config/database");

const sendResponse = require("../../utils/sendResponse");

const login = async (req, res, next) => {

    const { identifier, password } = req.body;

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier);

    const emailOrMobileNumber = isEmail
        ? { email: identifier }
        : { mobileNumber: identifier };


    const users = await prismaDB.user.findMany({
        where: emailOrMobileNumber,
        include: {
            userRoles: {
                include: {
                    role: {
                        include: {
                            rolePermissions: {
                                include: {
                                    permission: {
                                        select: {
                                            name: true,
                                            resource: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            tenant: true
        }
    });

    const validUsers = users.filter(user => bcrypt.compareSync(password, user.passwordHash));

    if (validUsers.length === 1) {
        const { id, name, email, tenant: { tenantId, businessName }, userRoles } = validUsers[0];

        const roles = userRoles.map(userRole => userRole.role.name);

        const permissions = userRoles.map(userRole => userRole.role.rolePermissions.map(p => p.permission)).flat(1);

        return sendResponse(res, 200, true, 'Login Successfull', {
            name,
            email,
            businessName,
            roles,
            permissions
        });
    }
};

module.exports = login;