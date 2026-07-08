const { default: z } = require("zod");
const nameValidator = require("../common/name");
const mobileNumberValidator = require("../common/mobile");
const emailValidator = require("../common/email");
const passwordValidator = require("../common/password");
const roleIdValidator = require("../uuid/roleId");


const addUserByTenantIdValidator = z.object({
    name: nameValidator,
    mobile: mobileNumberValidator,
    email: emailValidator,
    password: passwordValidator,
    role_id: roleIdValidator
});

module.exports = { addUserByTenantIdValidator };