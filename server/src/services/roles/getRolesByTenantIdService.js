import prismaDB from "../../config/database.js";
import { transformRolePermissions } from "../../utils/roles/transformRolePermissions.js";

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

export { getRolesByTenantIdService };
