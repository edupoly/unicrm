import prismaDB from "../../config/database.js";

const deleteRoleByRoleIdService = async (tenantId, roleId) => {
    const result = await prismaDB.role.delete({
        where: { tenantId, id: roleId }
    });
    return result;
};

export { deleteRoleByRoleIdService };
