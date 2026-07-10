const { default: z } = require("zod");
const { REQUIRED_ITEM_ID, INVALID_ITEM_ID } = require("../../errors/uuid/itemId");

const itemIdValidator = z
    .string(REQUIRED_ITEM_ID)
    .uuid(INVALID_ITEM_ID);

module.exports = itemIdValidator;