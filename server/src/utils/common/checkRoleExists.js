import prismaDB from "../../config/database.js";

const checkAllRolesExist = async (roleIds) => {
    const roles = await prismaDB.role.findMany({
        where: { id: { in: roleIds } },
        select: { id: true }
    });
    return roles.length === roleIds.length;
};

export { checkAllRolesExist };
