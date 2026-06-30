const prismaDB = require("../../config/database");

const updateRoleByRoleIdService = async (tenantId, roleId, name, description, permissions) => {
    const data = {
        ...(roleId && { id: roleId }),
        ...(name && { name }),
        ...(description && { description }),
        ...(permissions && { permissions })
    };

    const rolePermissions = permissions?.map(p => ({ roleId, permissionId: p.id }));

    const result = await prismaDB.$transaction(async (tx) => {
        const updatedRole = await tx.role.update({
            data: {
                ...(name && { name }),
                ...(description && { description })
            },
            where: { tenantId, id: roleId }
        });

        if (!rolePermissions || rolePermissions?.length === 0) return { updatedRole };

        const deletedPermissions = await tx.rolePermission.deleteMany({
            where: { roleId }
        });

        const updatedPermissions = await tx.rolePermission.createManyAndReturn({
            data: rolePermissions
        });

        return { updatedRole, updatedPermissions };
    });

    return data;
};

module.exports = { updateRoleByRoleIdService };