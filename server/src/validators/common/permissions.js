const { z } = require("zod");
const nameValidator = require("./name");
const permissionIdValidator = require("../uuid/permissionId");
const { REQUIRED_PERMISSIONS, INVALID_PERMISSIONS } = require("../../errors/common/permissions");
const descriptionValidator = require("./description");

const permissionSchema = z.object({
    id: permissionIdValidator,
    name: nameValidator,
    resource: nameValidator,
    description: descriptionValidator
});

const permissionsValidator = z
    .array(permissionSchema, REQUIRED_PERMISSIONS)
    .min(1, INVALID_PERMISSIONS);

module.exports = permissionsValidator;