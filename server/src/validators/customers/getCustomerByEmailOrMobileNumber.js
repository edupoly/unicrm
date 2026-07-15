import { z } from "zod";
import emailOrMobileNumberValidator from "../common/emailOrMobileNumber.js";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";

const getCustomerByEmailOrMobileNumberValidator = z.object({
    identifier: emailOrMobileNumberValidator
}, REQUIRED_OBJECT).strict();

export { getCustomerByEmailOrMobileNumberValidator };
