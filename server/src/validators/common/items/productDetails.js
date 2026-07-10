const { default: z } = require("zod");
const priceValidator = require("./price");
const quantityStockValidator = require("./quantityStock");
const customFieldsValidator = require("../customFields");

const productDetailsValidator = z.object({
    costPrice: priceValidator,
    stockQuantity: quantityStockValidator,
    minimumStockLevel: quantityStockValidator,
    customFields: customFieldsValidator
}).strict();

module.exports = productDetailsValidator;