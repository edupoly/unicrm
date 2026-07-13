const { default: z } = require("zod");
const customerIdValidator = require("../uuid/customerId");
const nameValidator = require("../common/name");
const mobileNumberValidator = require("../common/mobile");
const emailValidator = require("../common/email");
const addressValidator = require("../common/address");
const customFieldsValidator = require("../common/customFields");

const updateCustomerByCustomerIdValidator = z.object({
    id: customerIdValidator,
    name: nameValidator.optional(),
    mobileNumber: mobileNumberValidator.optional(),
    email: emailValidator.optional(),
    address: addressValidator.optional(),
    customFields: customFieldsValidator.optional()
});

module.exports = { updateCustomerByCustomerIdValidator };