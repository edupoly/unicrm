import prismaDB from "../../config/database.js";

import { NO_PERMISSIONS_IN_DB } from "../../errors/common/commonValidation.js";

const registerBusinessAndOwner = async (businessData) => {
    const {
        businessName, name,
        email, mobileNumber,
        passwordHash, roleName
    } = businessData;

    const permissions = await prismaDB.permission.findMany();

    if (permissions.length === 0) {
        throw new Error(NO_PERMISSIONS_IN_DB);
    }

    const result = await prismaDB.$transaction(async (tx) => {

        const tenant = await tx.tenant.create({
            data: { businessName }
        });

        const role = await tx.role.create({
            data: { tenantId: tenant.id, name: roleName, description: 'Full control on all units' }
        });

        const rolePermissions = await tx.rolePermission.createMany({
            data: permissions.map(p => ({ roleId: role.id, permissionId: p.id }))
        });

        const user = await tx.user.create({
            data: { tenantId: tenant.id, name, email, mobileNumber, passwordHash }
        });

        const userRoles = await tx.userRole.create({
            data: { userId: user.id, roleId: role.id }
        });

        return {
            tenantId: tenant.id, userId: user.id,
            roles: [role.name]
        };
    });

    return { ...result, permissions };
};

export default registerBusinessAndOwner;
