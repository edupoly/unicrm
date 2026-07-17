import prismaDB from '../../config/database.js';

const addUserByTenantIdService = async (tenantId, name, mobileNumber, email, passwordHash, roleIds) => {
    const result = await prismaDB.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: { tenantId, name, mobileNumber, email, passwordHash },
            select: {
                id: true,
                name: true,
                mobileNumber: true,
                email: true
            }
        });

        const userRolesData = roleIds.map(roleId => ({ userId: user.id, roleId }));

        await tx.userRole.createMany({
            data: userRolesData
        });

        const userWithRoles = await tx.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                name: true,
                mobileNumber: true,
                email: true,
                userRoles: {
                    select: {
                        role: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return userWithRoles;
    });

    return result;
};

export { addUserByTenantIdService };
