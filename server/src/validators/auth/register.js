const { z } = require("zod");

const businessNameValidator = require("../common/businessName");
const nameValidator = require("../common/name");
const emailValidator = require("../common/email");
const mobileNumberValidator = require("../common/mobile");
const passwordValidator = require("../common/password");
const roleNameValidator = require("../common/role");

const registerValidator = z.object({
    businessName: businessNameValidator,
    name: nameValidator,
    email: emailValidator,
    mobileNumber: mobileNumberValidator,
    password: passwordValidator,
    roleName: roleNameValidator
});

module.exports = { registerValidator };