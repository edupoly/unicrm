const { default: z } = require("zod");
const { REQUIRED_ROLE_ID, INVALID_ROLE_ID } = require("../../errors/uuid/roleId");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");

const deleteRoleByRoleIdValidator = z.object({
    id: z
        .string(REQUIRED_ROLE_ID)
        .uuid(INVALID_ROLE_ID)
}, REQUIRED_OBJECT);

module.exports = { deleteRoleByRoleIdValidator };