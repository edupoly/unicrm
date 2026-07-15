import { z } from "zod";

import businessNameValidator from "../common/businessName.js";
import nameValidator from "../common/name.js";
import emailValidator from "../common/email.js";
import mobileNumberValidator from "../common/mobile.js";
import passwordValidator from "../common/password.js";
import roleNameValidator from "../common/role.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";

const registerValidator = z.object({
    businessName: businessNameValidator,
    name: nameValidator,
    email: emailValidator,
    mobileNumber: mobileNumberValidator,
    password: passwordValidator,
    roleName: roleNameValidator
}, REQUIRED_OBJECT).strict();

export { registerValidator };
