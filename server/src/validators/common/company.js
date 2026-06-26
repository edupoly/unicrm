const { default: z } = require("zod");
const { REQUIRED_COMPANY, INVALID_COMPANY } = require("../../errors/common/company");

const companyValidator = z
    .string(REQUIRED_COMPANY)
    .min(1, INVALID_COMPANY);

module.exports = companyValidator;