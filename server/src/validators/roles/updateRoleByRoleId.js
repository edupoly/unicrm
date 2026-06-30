const { default: z } = require("zod");
const roleIdValidator = require("../uuid/roleId");
const nameValidator = require("../common/name");
const descriptionValidator = require("../common/description");
const permissionsValidator = require("../common/permissions");

const updateRoleByRoleIdValidator = z.object({
    id: roleIdValidator,
    name: nameValidator.optional(),
    description: descriptionValidator.optional(),
    permissions: permissionsValidator.optional()
});

module.exports = { updateRoleByRoleIdValidator };