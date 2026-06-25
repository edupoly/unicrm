const { z } = require('zod');

const emailOrMobileNumberValidator = require('../common/emailOrMobileNumber');
const passwordValidator = require('../common/password');
const { REQUIRED_OBJECT } = require('../../errors/common/commonValidation');

const loginValidator = z.object({
    identifier: emailOrMobileNumberValidator,
    password: passwordValidator
}, { message: REQUIRED_OBJECT });

module.exports = loginValidator;