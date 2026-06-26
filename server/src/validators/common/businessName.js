const { z } = require("zod");
const { REQUIRED_BUSINESS_NAME, INVALID_BUSINESS_NAME } = require("../../errors/common/businessName");

const businessNameValidator = z
    .string(REQUIRED_BUSINESS_NAME)
    .min(3, INVALID_BUSINESS_NAME);

module.exports = businessNameValidator;