import { z } from "zod";

import nameValidator from "../common/name.js";
import skuValidator from "../common/items/sku.js";
import priceValidator from "../common/items/price.js";
import itemTypeValidator from "../common/items/itemType.js";
import discountPercentageValidator from "../common/items/discountPercentage.js";
import isOnSaleValidator from "../common/items/isOnSale.js";
import customFieldsValidator from "../common/customFields.js";
import productDetailsValidator from "../common/items/productDetails.js";
import serviceDetailsValidator from "../common/items/serviceDetails.js";

import { REQUIRED_OBJECT, REQUIRED_ARRAY, INVALID_ARRAY } from "../../errors/common/commonValidation.js";

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
    }, REQUIRED_OBJECT).strict(), REQUIRED_ARRAY).min(1, INVALID_ARRAY)

}, REQUIRED_OBJECT).strict();

export { addItemsByTenantIdValidator };
