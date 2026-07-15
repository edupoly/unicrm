const transformRolePermissions = (role) => {
    const permissions = role.rolePermissions;
    return {
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: permissions.map(p => p.permission)
    };
};

export { transformRolePermissions };
