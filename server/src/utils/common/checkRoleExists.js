const prismaDB = require("../../config/database");

const checkAllRolesExist = async (roleIds) => {
    const roles = await prismaDB.role.findMany({
        where: { id: { in: roleIds } },
        select: { id: true }
    });
    return roles.length === roleIds.length;
};

module.exports = { checkAllRolesExist };
