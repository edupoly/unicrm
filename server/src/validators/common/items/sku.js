const { default: z } = require("zod");
const { INVALID_SKU } = require("../../../errors/items/sku");

const skuValidator = z
    .string()
    .min(2, INVALID_SKU)
    .default(null)
    .optional();

module.exports = skuValidator;