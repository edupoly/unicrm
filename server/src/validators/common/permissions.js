import { z } from "zod";
import nameValidator from "./name.js";
import permissionIdValidator from "../uuid/permissionId.js";
import permissionsValidationErrors from "../../errors/common/permissions.js";
import descriptionValidator from "./description.js";

const { REQUIRED_PERMISSIONS, INVALID_PERMISSIONS } = permissionsValidationErrors;

const permissionSchema = z.object({
    id: permissionIdValidator,
    name: nameValidator,
    resource: nameValidator,
    description: descriptionValidator
});

const permissionsValidator = z
    .array(permissionSchema, REQUIRED_PERMISSIONS)
    .min(1, INVALID_PERMISSIONS);

export default permissionsValidator;
