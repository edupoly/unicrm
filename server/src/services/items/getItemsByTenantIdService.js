import prismaDB from "../../config/database.js";
import { ITEM_FIELDS_OBJ } from "../../constants/items.js";

const getItemsByTenantIdService = async (tenantId) => {
    const items = await prismaDB.item.findMany({
        ...ITEM_FIELDS_OBJ,
        where: { tenantId }
    });
    return items;
};

export { getItemsByTenantIdService };
