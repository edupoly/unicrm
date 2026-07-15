import { z } from "zod";
import { REQUIRED_PRICE, INVALID_PRICE } from "../../../errors/items/price.js";

const priceValidator = z
    .number(REQUIRED_PRICE)
    .min(1, INVALID_PRICE);

export default priceValidator;
