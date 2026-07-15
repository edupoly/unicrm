import prismaDB from "../../config/database.js";

const deleteUserByUserIdService = async (tenantId, userId) => {
    const result = await prismaDB.user.delete({
        where: { id: userId, tenantId }
    });
    return result;
};

export { deleteUserByUserIdService };
