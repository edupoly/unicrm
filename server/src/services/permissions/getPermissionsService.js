const prismaDB = require("../../config/database");

const getPermissionsService = async () => {
    const permissions = await prismaDB.permission.findMany({
        select: { id: true, name: true, resource: true, description: true }
    });
    return permissions;
};

module.exports = { getPermissionsService };