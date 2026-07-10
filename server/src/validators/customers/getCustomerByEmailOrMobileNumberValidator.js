const { default: z } = require("zod");
const emailOrMobileNumberValidator = require("../common/emailOrMobileNumber");
const { REQUIRED_OBJECT } = require("../../errors/common/commonValidation");

const getCustomerByEmailOrMobileNumberValidator = z.object({
    identifier: emailOrMobileNumberValidator
}, REQUIRED_OBJECT).strict();

module.exports = { getCustomerByEmailOrMobileNumberValidator };