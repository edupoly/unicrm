const { default: z } = require("zod");
const { INVALID_QUANTITY_STOCK, REQUIRED_QUANTITY_STOCK } = require("../../../errors/items/quantityStock");

const quantityStockValidator = z
    .number(REQUIRED_QUANTITY_STOCK)
    .min(1, INVALID_QUANTITY_STOCK);

module.exports = quantityStockValidator;