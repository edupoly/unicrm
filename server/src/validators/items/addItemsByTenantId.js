const { default: z } = require("zod");

const nameValidator = require("../common/name");
const skuValidator = require("../common/items/sku");
const priceValidator = require("../common/items/price");
const itemTypeValidator = require("../common/items/itemType");
const discountPercentageValidator = require("../common/items/discountPercentage");
const isOnSaleValidator = require("../common/items/isOnSale");
const customFieldsValidator = require("../common/customFields");
const productDetailsValidator = require("../common/items/productDetails");
const serviceDetailsValidator = require("../common/items/serviceDetails");

const { REQUIRED_OBJECT, REQUIRED_ARRAY, INVALID_ARRAY } = require("../../errors/common/commonValidation");

const addItemsByTenantIdValidator = z.object({
    
    items: z.array(z.object({
        name: nameValidator,
        sku: skuValidator,
        price: priceValidator,
        itemType: itemTypeValidator,
        discountPercentage: discountPercentageValidator,
        isOnSale: isOnSaleValidator,
        customFields: customFieldsValidator,
        productDetails: productDetailsValidator.optional(),
        serviceDetails: serviceDetailsValidator.optional()
    }), REQUIRED_ARRAY).min(1, INVALID_ARRAY)

}, REQUIRED_OBJECT);

module.exports = { addItemsByTenantIdValidator };