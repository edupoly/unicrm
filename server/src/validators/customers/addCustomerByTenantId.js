const { default: z } = require("zod");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");
const nameValidator = require("../common/name");
const emailValidator = require("../common/email");
const mobileNumberValidator = require("../common/mobile");
const addressValidator = require("../common/address");
const customFieldsValidator = require("../common/customFields");

const addCustomerByTenantIdValidator = z.object({
    name: nameValidator,
    mobileNumber: mobileNumberValidator,
    email: emailValidator.optional(),
    address: addressValidator.optional(),
    customFields: customFieldsValidator
}, REQUIRED_OBJECT).strict();

module.exports = { addCustomerByTenantIdValidator };