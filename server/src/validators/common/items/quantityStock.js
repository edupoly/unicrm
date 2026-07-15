import { z } from "zod";
import { INVALID_QUANTITY_STOCK, REQUIRED_QUANTITY_STOCK } from "../../../errors/items/quantityStock.js";

const quantityStockValidator = z
    .number(REQUIRED_QUANTITY_STOCK)
    .min(1, INVALID_QUANTITY_STOCK);

export default quantityStockValidator;
