const prismaDB = require("../../config/database");

const userInclude = {
    userRoles: {
        include: {
            role: {
                include: {
                    rolePermissions: {
                        include: {
                            permission: {
                                select: {
                                    id: true,
                                    name: true,
                                    resource: true,
                                    description: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    tenant: {
        select: { id: true, businessName: true }
    }
};

const findMultipleUsers = async (identifier) => {
    const users = await prismaDB.user.findMany({
        where: identifier,
        include: userInclude
    });
    return users;
};

const findUser = async (id, tenantId) => {
    const user = await prismaDB.user.findUniqueOrThrow({
        where: { id, tenantId },
        include: userInclude
    });
    return user;
}

module.exports = { findMultipleUsers, findUser };