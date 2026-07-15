import { z } from "zod";
import roleNameValidator from "../common/role.js";
import permissionsValidator from "../common/permissions.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";
import descriptionValidator from "../common/description.js";

const addRoleByTenantIdValidator = z.object({
    roleName: roleNameValidator,
    permissions: permissionsValidator,
    description: descriptionValidator.optional()
}, REQUIRED_OBJECT).strict();

export { addRoleByTenantIdValidator };
