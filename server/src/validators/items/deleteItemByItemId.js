import { z } from "zod";

import itemIdValidator from "../uuid/itemId.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";

const deleteItemByItemIdValidator = z.object({
    id: itemIdValidator
}, REQUIRED_OBJECT).strict();

export { deleteItemByItemIdValidator };
