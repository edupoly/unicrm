const { default: z } = require("zod");
const roleIdValidator = require("../uuid/roleId");
const nameValidator = require("../common/name");
const descriptionValidator = require("../common/description");
const permissionsValidator = require("../common/permissions");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");

const updateRoleByRoleIdValidator = z.object({
    id: roleIdValidator,
    name: nameValidator.optional(),
    description: descriptionValidator.optional(),
    permissions: permissionsValidator.optional()
}, REQUIRED_OBJECT);

module.exports = { updateRoleByRoleIdValidator };