const { default: z } = require("zod");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");

const itemIdValidator = require("../uuid/itemId");
const nameValidator = require("../common/name");
const skuValidator = require("../common/items/sku");
const priceValidator = require("../common/items/price");
const itemTypeValidator = require("../common/items/itemType");
const discountPercentageValidator = require("../common/items/discountPercentage");
const isOnSaleValidator = require("../common/items/isOnSale");
const customFieldsValidator = require("../common/customFields");
const productDetailsValidator = require("../common/items/productDetails");
const serviceDetailsValidator = require("../common/items/serviceDetails");

const updateItemByItemIdValidator = z.object({
    id: itemIdValidator,
    name: nameValidator.optional(),
    sku: skuValidator.optional(),
    price: priceValidator.optional(),
    itemType: itemTypeValidator.optional(),
    discountPercentage: discountPercentageValidator.optional(),
    isOnSale: isOnSaleValidator.optional(),
    customFields: customFieldsValidator.optional(),
    productDetails: productDetailsValidator.optional(),
    serviceDetails: serviceDetailsValidator.optional()
}, REQUIRED_OBJECT).strict();

module.exports = updateItemByItemIdValidator;