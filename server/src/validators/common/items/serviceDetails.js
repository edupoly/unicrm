const { default: z } = require("zod");
const customFieldsValidator = require("../customFields");
const durationMinValidator = require("./durationMin");

const serviceDetailsValidator = z.object({
    durationMin: durationMinValidator,
    customFields: customFieldsValidator
});

module.exports = serviceDetailsValidator;