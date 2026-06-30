const prismaDB = require("../../config/database");

const deleteRoleByRoleIdService = async (tenantId, roleId) => {
    const result = await prismaDB.role.delete({
        where: { tenantId, id: roleId }
    });
    return result;
};

module.exports = { deleteRoleByRoleIdService };