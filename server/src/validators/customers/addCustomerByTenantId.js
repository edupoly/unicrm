import { z } from "zod";
import { REQUIRED_OBJECT } from "../../errors/common/commonValidation.js";
import nameValidator from "../common/name.js";
import emailValidator from "../common/email.js";
import mobileNumberValidator from "../common/mobile.js";
import addressValidator from "../common/address.js";
import customFieldsValidator from "../common/customFields.js";

const addCustomerByTenantIdValidator = z.object({
    name: nameValidator,
    mobileNumber: mobileNumberValidator,
    email: emailValidator.optional(),
    address: addressValidator.optional(),
    customFields: customFieldsValidator
}, REQUIRED_OBJECT).strict();

export { addCustomerByTenantIdValidator };
