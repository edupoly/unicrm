const { default: z } = require("zod");
const { REQUIRED_DESCRIPTION, INVALID_DESCRIPTION } = require("../../errors/common/description");

const descriptionValidator = z
    .string(REQUIRED_DESCRIPTION)
    .min(7, INVALID_DESCRIPTION);

module.exports = descriptionValidator;