const { default: z } = require("zod");
const nameValidator = require("../common/name");
const mobileNumberValidator = require("../common/mobile");
const emailValidator = require("../common/email");
const passwordValidator = require("../common/password");
const roleIdValidator = require("../uuid/roleId");
const userIdValidator = require("../uuid/userId");


const updateUserByUserIdValidator = z.object({
    id: userIdValidator,
    name: nameValidator.optional(),
    mobile: mobileNumberValidator.optional(),
    email: emailValidator.optional(),
    password: passwordValidator.optional(),
    id: roleIdValidator.optional()
});

module.exports = { updateUserByUserIdValidator };