import { z } from "zod";
import nameValidator from "../common/name.js";
import mobileNumberValidator from "../common/mobile.js";
import emailValidator from "../common/email.js";
import passwordValidator from "../common/password.js";
import roleIdValidator from "../uuid/roleId.js";
import userIdValidator from "../uuid/userId.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";


const updateUserByUserIdValidator = z.object({
    id: userIdValidator,
    name: nameValidator.optional(),
    mobileNumber: mobileNumberValidator.optional(),
    email: emailValidator.optional(),
    password: passwordValidator.optional(),
    roleIds: z.array(roleIdValidator).optional()
}, REQUIRED_OBJECT).strict();

export { updateUserByUserIdValidator };
