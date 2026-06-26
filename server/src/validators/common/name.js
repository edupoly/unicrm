const { default: z } = require("zod");
const { REQUIRED_NAME, INVALID_NAME } = require("../../errors/common/name");

const nameValidator = z
    .string(REQUIRED_NAME)
    .min(3, INVALID_NAME);

module.exports = nameValidator;