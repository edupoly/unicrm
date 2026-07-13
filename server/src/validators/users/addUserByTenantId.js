const { default: z } = require("zod");
const nameValidator = require("../common/name");
const mobileNumberValidator = require("../common/mobile");
const emailValidator = require("../common/email");
const passwordValidator = require("../common/password");
const roleIdValidator = require("../uuid/roleId");
const { REQUIRED_OBJECT, REQUIRED_ARRAY, INVALID_ARRAY } = require("../../errors/common/commonValidation");


const addUserByTenantIdValidator = z.object({
    name: nameValidator,
    mobileNumber: mobileNumberValidator,
    email: emailValidator.optional(),
    password: passwordValidator,
    roleIds: z.array(roleIdValidator, REQUIRED_ARRAY).min(1, INVALID_ARRAY)
}, REQUIRED_OBJECT).strict();

module.exports = { addUserByTenantIdValidator };