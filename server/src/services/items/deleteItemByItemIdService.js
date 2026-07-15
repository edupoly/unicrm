import prismaDB from "../../config/database.js";

const deleteItemByItemIdService = async (tenantId, itemId) => {
    const result = await prismaDB.item.delete({
        where: {
            tenantId,
            id: itemId
        }
    });
    return result;
};

export { deleteItemByItemIdService };
