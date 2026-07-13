const { default: z } = require("zod");
const nameValidator = require("../common/name");
const mobileNumberValidator = require("../common/mobile");
const emailValidator = require("../common/email");
const passwordValidator = require("../common/password");
const roleIdValidator = require("../uuid/roleId");
const userIdValidator = require("../uuid/userId");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");


const updateUserByUserIdValidator = z.object({
    id: userIdValidator,
    name: nameValidator.optional(),
    mobileNumber: mobileNumberValidator.optional(),
    email: emailValidator.optional(),
    password: passwordValidator.optional(),
    roleIds: z.array(roleIdValidator).optional()
}, REQUIRED_OBJECT).strict();

module.exports = { updateUserByUserIdValidator };