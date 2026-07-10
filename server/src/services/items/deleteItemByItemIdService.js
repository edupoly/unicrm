const prismaDB = require("../../config/database");

const deleteItemByItemIdService = async (tenantId, itemId) => {
    const result = await prismaDB.item.delete({
        where: {
            tenantId,
            id: itemId
        }
    });
    return result;
};

module.exports = { deleteItemByItemIdService };