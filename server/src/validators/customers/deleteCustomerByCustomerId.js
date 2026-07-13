const { default: z } = require("zod");
const customerIdValidator = require("../uuid/customerId");

const deleteCustomerByCustomerIdValidator = z.object({
    id: customerIdValidator
});

module.exports = { deleteCustomerByCustomerIdValidator };