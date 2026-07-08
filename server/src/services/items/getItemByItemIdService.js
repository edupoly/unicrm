const prismaDB = require("../../config/database");
const { ITEM_FIELDS_OBJ } = require("../../constants/items");

const getItemByItemIdService = async (itemId, tenantId) => {
    const item = await prismaDB.item.findUniqueOrThrow({
        ...ITEM_FIELDS_OBJ,
        where: {
            id: itemId,
            tenantId,
        }
    });
    return item;
};

module.exports = { getItemByItemIdService };