import { z } from "zod";
import { INVALID_SKU } from "../../../errors/items/sku.js";

const skuValidator = z
    .string()
    .min(2, INVALID_SKU)
    .default(null)
    .optional();

export default skuValidator;
