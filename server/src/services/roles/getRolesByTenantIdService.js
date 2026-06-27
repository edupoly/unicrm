const prismaDB = require("../../config/database");

const getRolesByTenantIdService = async (tenantId) => {
    const roles = await prismaDB.role.findMany({
        select: {
            id: true,
            name: true,
            description: true
        },
        where: {
            tenantId
        }
    });

    return roles;
};

module.exports = { getRolesByTenantIdService };