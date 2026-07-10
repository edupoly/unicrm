const { default: z } = require("zod");
const { REQUIRED_DURATION_MIN, INVALID_DURATION_MIN } = require("../../../errors/items/durationMin");

const durationMinValidator = z
    .number(REQUIRED_DURATION_MIN)
    .min(1, INVALID_DURATION_MIN);

module.exports = durationMinValidator;