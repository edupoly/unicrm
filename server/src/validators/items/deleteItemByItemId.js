const { default: z } = require("zod");

const itemIdValidator = require("../uuid/itemId");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");

const deleteItemByItemIdValidator = z.object({
    id: itemIdValidator
}, REQUIRED_OBJECT).strict();

module.exports = { deleteItemByItemIdValidator };