const { z } = require("zod");
const { REQUIRED_PASSWORD, INVALID_PASSWORD } = require("../../errors/common/password");

const passwordValidator = z
    .string(REQUIRED_PASSWORD)
    .min(8, INVALID_PASSWORD);

module.exports = passwordValidator;