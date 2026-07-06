const prismaDB = require("../../config/database");

const deleteUserByUserIdService = async (tenantId, userId) => {
    const result = await prismaDB.user.delete({
        where: { id: userId, tenantId }
    });
    return result;
};

module.exports = { deleteUserByUserIdService };
