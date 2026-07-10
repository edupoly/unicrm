const { default: z } = require("zod");
const { REQUIRED_ROLE_ID, INVALID_ROLE_ID } = require("../../errors/uuid/roleId");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");
const userIdValidator = require("../uuid/userId");

const deleteUserByUserIdValidator = z.object({
    id: userIdValidator
}, REQUIRED_OBJECT).strict();

module.exports = { deleteUserByUserIdValidator };