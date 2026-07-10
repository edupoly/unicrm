const { z } = require("zod");

const businessNameValidator = require("../common/businessName");
const nameValidator = require("../common/name");
const emailValidator = require("../common/email");
const mobileNumberValidator = require("../common/mobile");
const passwordValidator = require("../common/password");
const roleNameValidator = require("../common/role");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");

const registerValidator = z.object({
    businessName: businessNameValidator,
    name: nameValidator,
    email: emailValidator,
    mobileNumber: mobileNumberValidator,
    password: passwordValidator,
    roleName: roleNameValidator
}, REQUIRED_OBJECT);

module.exports = { registerValidator };