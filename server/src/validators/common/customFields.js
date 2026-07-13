const { default: z } = require("zod");
const { INVALID_CUSTOM_FIELDS } = require("../../errors/common/customFields");

const customFieldsValidator = z
    .object({}, INVALID_CUSTOM_FIELDS)
    .optional();

module.exports = customFieldsValidator;