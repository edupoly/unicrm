const prismaDB = require("../../config/database");

const checkRoleExists = async (roleId) => {
    const role = await prismaDB.role.findUnique({
        where: { id: roleId },
        select: { id: true }
    });
    return !!role;
};

module.exports = { checkRoleExists };
