const { z } = require("zod");
const { REQUIRED_EMAIL, INVALID_EMAIL } = require("../../errors/common/email");

const emailValidator = z
    .string(REQUIRED_EMAIL)
    .email(INVALID_EMAIL);

module.exports = emailValidator;