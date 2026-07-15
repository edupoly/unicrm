import { z } from "zod";
import nameValidator from "../common/name.js";
import mobileNumberValidator from "../common/mobile.js";
import emailValidator from "../common/email.js";
import passwordValidator from "../common/password.js";
import roleIdValidator from "../uuid/roleId.js";
import { REQUIRED_OBJECT, REQUIRED_ARRAY, INVALID_ARRAY } from "../../errors/common/commonValidation.js";


const addUserByTenantIdValidator = z.object({
    name: nameValidator,
    mobileNumber: mobileNumberValidator,
    email: emailValidator.optional(),
    password: passwordValidator,
    roleIds: z.array(roleIdValidator, REQUIRED_ARRAY).min(1, INVALID_ARRAY)
}, REQUIRED_OBJECT).strict();

export { addUserByTenantIdValidator };
