import { z } from "zod";
import roleIdValidator from "../uuid/roleId.js";
import nameValidator from "../common/name.js";
import descriptionValidator from "../common/description.js";
import permissionsValidator from "../common/permissions.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";

const updateRoleByRoleIdValidator = z.object({
    id: roleIdValidator,
    name: nameValidator.optional(),
    description: descriptionValidator.optional(),
    permissions: permissionsValidator.optional()
}, REQUIRED_OBJECT).strict();

export { updateRoleByRoleIdValidator };
