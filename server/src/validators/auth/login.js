const { z } = require('zod');

const { REQUIRED_OBJECT } = require('../../errors/common/commonValidation');

const emailOrMobileNumberValidator = require('../common/emailOrMobileNumber');
const passwordValidator = require('../common/password');
const tenantIdValidator = require('../uuid/tenantId');
const businessNameValidator = require('../common/businessName');


const loginValidator = z.object({
    identifier: emailOrMobileNumberValidator,
    password: passwordValidator
}, { message: REQUIRED_OBJECT });


const verifyUserCompanyValidator = z.object({
    tenantId: tenantIdValidator,
    businessName: businessNameValidator
}, { message: REQUIRED_OBJECT });


module.exports = { loginValidator, verifyUserCompanyValidator };