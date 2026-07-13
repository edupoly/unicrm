const { default: z } = require("zod");
const { REQUIRED_CUSTOMER_ID, INVALID_CUSTOMER_ID } = require("../../errors/uuid/customerId");

const customerIdValidator = z
    .string(REQUIRED_CUSTOMER_ID)
    .uuid(INVALID_CUSTOMER_ID);

module.exports = customerIdValidator;