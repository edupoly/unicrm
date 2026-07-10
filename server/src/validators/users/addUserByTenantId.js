const { default: z } = require("zod");
const nameValidator = require("../common/name");
const mobileNumberValidator = require("../common/mobile");
const emailValidator = require("../common/email");
const passwordValidator = require("../common/password");
const roleIdValidator = require("../uuid/roleId");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");


const addUserByTenantIdValidator = z.object({
    name: nameValidator,
    mobileNumber: mobileNumberValidator,
    email: emailValidator,
    password: passwordValidator,
    roleIds: z.array(roleIdValidator).min(1, "At least one role is required")
}, REQUIRED_OBJECT);

module.exports = { addUserByTenantIdValidator };