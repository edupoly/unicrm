const { default: z } = require("zod");
const { REQUIRED_PRICE, INVALID_PRICE } = require("../../../errors/items/price");

const priceValidator = z
    .number(REQUIRED_PRICE)
    .min(1, INVALID_PRICE);

module.exports = priceValidator;