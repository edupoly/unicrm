import prismaDB from "../../config/database.js";
import { ITEM_FIELDS_OBJ } from "../../constants/items.js";

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

export { getItemByItemIdService };
