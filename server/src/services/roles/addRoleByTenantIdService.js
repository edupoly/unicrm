const prismaDB = require("../../config/database");

const addRoleByTenantIdService = async (tenantId, roleName, description, permissions) => {

    const result = await prismaDB.$transaction(async (tx) => {

        const role = await tx.role.create({
            data: {
                tenantId,
                name: roleName,
                description
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        const permissionIdsRoleId = permissions.map(p => ({ permissionId: p.id, roleId: role.id }));

        const rolePermissions = await tx.rolePermission.createMany({
            data: permissionIdsRoleId
        });

        return { role, permissions };
    });

    return result;
};

module.exports = { addRoleByTenantIdService };