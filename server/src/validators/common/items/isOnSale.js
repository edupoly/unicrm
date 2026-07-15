import { z } from "zod";
import { REQUIRED_IS_ON_SALE } from "../../../errors/items/isOnSale.js";

const isOnSaleValidator = z
    .boolean(REQUIRED_IS_ON_SALE)
    .default(true);

export default isOnSaleValidator;
