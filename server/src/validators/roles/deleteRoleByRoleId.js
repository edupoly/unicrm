const { default: z } = require("zod");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");
const roleIdValidator = require("../uuid/roleId");

const deleteRoleByRoleIdValidator = z.object({
    id: roleIdValidator
}, REQUIRED_OBJECT);

module.exports = { deleteRoleByRoleIdValidator };