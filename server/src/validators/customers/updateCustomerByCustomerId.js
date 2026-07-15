import { z } from "zod";
import customerIdValidator from "../uuid/customerId.js";
import nameValidator from "../common/name.js";
import mobileNumberValidator from "../common/mobile.js";
import emailValidator from "../common/email.js";
import addressValidator from "../common/address.js";
import customFieldsValidator from "../common/customFields.js";

const updateCustomerByCustomerIdValidator = z.object({
    id: customerIdValidator,
    name: nameValidator.optional(),
    mobileNumber: mobileNumberValidator.optional(),
    email: emailValidator.optional(),
    address: addressValidator.optional(),
    customFields: customFieldsValidator.optional()
});

export { updateCustomerByCustomerIdValidator };
