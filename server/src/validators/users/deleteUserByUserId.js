import { z } from "zod";
import { REQUIRED_ROLE_ID, INVALID_ROLE_ID } from "../../errors/uuid/roleId.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";
import userIdValidator from "../uuid/userId.js";

const deleteUserByUserIdValidator = z.object({
    id: userIdValidator
}, REQUIRED_OBJECT).strict();

export { deleteUserByUserIdValidator };
