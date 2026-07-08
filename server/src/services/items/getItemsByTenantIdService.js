const prismaDB = require("../../config/database");
const { ITEM_FIELDS_OBJ } = require("../../constants/items");

const getItemsByTenantIdService = async (tenantId) => {
    const items = await prismaDB.item.findMany({
        ...ITEM_FIELDS_OBJ,
        where: { tenantId }
    });
    return items;
};

module.exports = { getItemsByTenantIdService };