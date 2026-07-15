import prismaDB from "../../config/database.js";

const getUsersByTenantIdService = async (tenantId) => {
    const users = await prismaDB.user.findMany({
        where: { tenantId },
        select: {
            id: true,
            name: true,
            mobileNumber: true,
            email: true,
            createdAt: true,
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

    return users;
};

export { getUsersByTenantIdService };
