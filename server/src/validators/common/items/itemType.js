const { default: z } = require("zod");
const { ITEM_TYPE_PRODUCT, ITEM_TYPE_SERVICE } = require("../../../constants/items");
const { INVALID_ITEM_TYPE } = require("../../../errors/items/itemType");

const itemTypeValidator = z
    .enum([ITEM_TYPE_PRODUCT, ITEM_TYPE_SERVICE], INVALID_ITEM_TYPE);

module.exports = itemTypeValidator;