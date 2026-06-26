const { z } = require('zod');

const { REQUIRED_OBJECT } = require('../../errors/common/commonValidation');

const emailOrMobileNumberValidator = require('../common/emailOrMobileNumber');
const passwordValidator = require('../common/password');

const companyValidator = require('../common/company');


const loginValidator = z.object({
    identifier: emailOrMobileNumberValidator,
    password: passwordValidator
}, { message: REQUIRED_OBJECT });


const verifyUserCompanyValidator = z.object({
    company: companyValidator
}, { message: REQUIRED_OBJECT });


module.exports = { loginValidator, verifyUserCompanyValidator };