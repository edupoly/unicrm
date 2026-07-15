import { z } from "zod";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";
import roleIdValidator from "../uuid/roleId.js";

const deleteRoleByRoleIdValidator = z.object({
    id: roleIdValidator
}, REQUIRED_OBJECT).strict();

export { deleteRoleByRoleIdValidator };
