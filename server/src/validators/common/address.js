const { default: z } = require("zod");
const { REQUIRED_ADDRESS, INVALID_ADDRESS } = require("../../errors/common/address");

const addressValidator = z
    .string(REQUIRED_ADDRESS)
    .min(6, INVALID_ADDRESS);

module.exports = addressValidator;    