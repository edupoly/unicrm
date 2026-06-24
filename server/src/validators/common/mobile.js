const { z } = require("zod");
const { REQUIRED_MOBILE_NUMBER, INVALID_MOBILE_NUMBER } = require("../../errors/common/mobile");

const mobileNumberValidator = z
    .string(REQUIRED_MOBILE_NUMBER)
    .min(10, INVALID_MOBILE_NUMBER)
    .max(10, INVALID_MOBILE_NUMBER);

module.exports = mobileNumberValidator;