const checkPermissionExists = (allPermissions, permission) => {
    const isPermissionExists = allPermissions.find(p => {
        return p.id === permission.id
            && p.name === permission.name
            && p.resource === permission.resource
            && p.description === p.description;
    });
    return isPermissionExists;
};

module.exports = { checkPermissionExists };