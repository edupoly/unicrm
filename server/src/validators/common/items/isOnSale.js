const { default: z } = require("zod");
const { REQUIRED_IS_ON_SALE } = require("../../../errors/items/isOnSale");

const isOnSaleValidator = z
    .boolean(REQUIRED_IS_ON_SALE)
    .default(true);

module.exports = isOnSaleValidator;