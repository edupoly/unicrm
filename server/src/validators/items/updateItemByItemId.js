import { z } from "zod";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";

import itemIdValidator from "../uuid/itemId.js";
import nameValidator from "../common/name.js";
import skuValidator from "../common/items/sku.js";
import priceValidator from "../common/items/price.js";
import itemTypeValidator from "../common/items/itemType.js";
import discountPercentageValidator from "../common/items/discountPercentage.js";
import isOnSaleValidator from "../common/items/isOnSale.js";
import customFieldsValidator from "../common/customFields.js";
import productDetailsValidator from "../common/items/productDetails.js";
import serviceDetailsValidator from "../common/items/serviceDetails.js";

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

export { updateItemByItemIdValidator };
