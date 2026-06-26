const { z } = require("zod");

const emailValidator = require("./email");
const mobileNumberValidator = require("./mobile");

const { INVALID_EMAIL_OR_MOBILE_NUMBER } = require("../../errors/common/emailOrMobileNumber");

const emailOrMobileNumberValidator = z
    .union([emailValidator, mobileNumberValidator], INVALID_EMAIL_OR_MOBILE_NUMBER);

module.exports = emailOrMobileNumberValidator;