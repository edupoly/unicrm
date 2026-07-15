import { z } from 'zod';

import { REQUIRED_OBJECT } from '../../errors/common/commonValidation.js';

import emailOrMobileNumberValidator from '../common/emailOrMobileNumber.js';
import passwordValidator from '../common/password.js';
import tenantIdValidator from '../uuid/tenantId.js';
import businessNameValidator from '../common/businessName.js';


const loginValidator = z.object({
    identifier: emailOrMobileNumberValidator,
    password: passwordValidator
}, REQUIRED_OBJECT).strict();


const verifyUserCompanyValidator = z.object({
    tenantId: tenantIdValidator,
    businessName: businessNameValidator
}, REQUIRED_OBJECT).strict();


export { loginValidator, verifyUserCompanyValidator };
