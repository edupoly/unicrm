const { z } = require('zod');

const tenantIdValidator = require('../uuid/tenantId');
const roleValidator = require('../common/role');
const mobileNumberValidator = require('../common/mobile');
const emailValidator = require('../common/email');
const passwordValidator = require('../common/password');

const loginValidator = z.object({
    tenantId: tenantIdValidator,
    role: roleValidator,
    mobileNumber: mobileNumberValidator,
    email: emailValidator,
    password: passwordValidator
});

module.exports = loginValidator;