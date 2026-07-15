import { z } from "zod";
import priceValidator from "./price.js";
import quantityStockValidator from "./quantityStock.js";
import customFieldsValidator from "../customFields.js";

const productDetailsValidator = z.object({
    costPrice: priceValidator,
    stockQuantity: quantityStockValidator,
    minimumStockLevel: quantityStockValidator,
    customFields: customFieldsValidator
}).strict();

export default productDetailsValidator;
