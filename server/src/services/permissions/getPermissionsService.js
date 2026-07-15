import prismaDB from "../../config/database.js";

const getPermissionsService = async () => {
    const permissions = await prismaDB.permission.findMany({
        select: { id: true, name: true, resource: true, description: true }
    });
    return permissions;
};

export { getPermissionsService };
