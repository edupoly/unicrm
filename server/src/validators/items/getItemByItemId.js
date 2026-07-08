const { default: z } = require("zod");
const { itemIdValidator } = require("../uuid/itemId");

const getItemByItemIdValidator = z.object({
    id: itemIdValidator
});

module.exports = { getItemByItemIdValidator };