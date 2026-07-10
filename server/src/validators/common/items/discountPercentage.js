const { default: z } = require("zod");
const { REQUIRED_DISCOUNT } = require("../../../errors/items/discountPercentage");

const discountPercentageValidator = z
    .number(REQUIRED_DISCOUNT)
    .default(0);

module.exports = discountPercentageValidator;