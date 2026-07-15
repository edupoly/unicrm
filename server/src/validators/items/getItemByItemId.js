import { z } from "zod";
import itemIdValidator from "../uuid/itemId.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";

const getItemByItemIdValidator = z.object({
    id: itemIdValidator
}, REQUIRED_OBJECT).strict();

export { getItemByItemIdValidator };
