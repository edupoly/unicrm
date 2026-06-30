const prismaDB = require("../../config/database");
const { transformRolePermissions } = require("../../utils/roles/transformRolePermissions");

const getRolesByTenantIdService = async (tenantId) => {
    const roles = await prismaDB.role.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            rolePermissions: {
                select: {
                    permission: true
                }
            }
        },
        where: {
            tenantId
        }
    });

    const transformedRoles = roles.map(r => transformRolePermissions(r));

    return transformedRoles;
};

module.exports = { getRolesByTenantIdService };