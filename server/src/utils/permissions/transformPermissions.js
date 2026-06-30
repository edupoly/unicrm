const transformPermissions = (permissionsArray) => {
    const transformPermissionsObj = permissionsArray.reduce((acc, permission) => {
        const resourceKey = permission.resource.toUpperCase();
        const actionKey = permission.name.toUpperCase();

        if (!acc[resourceKey]) {
            acc[resourceKey] = {};
        }

        acc[resourceKey][actionKey] = {
            id: permission.id,
            name: permission.name,
            resource: permission.resource,
            description: permission.description
        };

        return acc;
    }, {});

    return transformPermissionsObj;
};

module.exports = { transformPermissions };