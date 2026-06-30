const { default: z } = require("zod");
const roleNameValidator = require("../common/role");
const permissionsValidator = require("../common/permissions");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");
const descriptionValidator = require("../common/description");

const addRoleByTenantIdValidator = z.object({
    roleName: roleNameValidator,
    permissions: permissionsValidator,
    description: descriptionValidator.optional()
}, REQUIRED_OBJECT);

module.exports = { addRoleByTenantIdValidator };