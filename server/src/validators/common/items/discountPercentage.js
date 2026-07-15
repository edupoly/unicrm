import { z } from "zod";
import { REQUIRED_DISCOUNT } from "../../../errors/items/discountPercentage.js";

const discountPercentageValidator = z
    .number(REQUIRED_DISCOUNT)
    .default(0);

export default discountPercentageValidator;
