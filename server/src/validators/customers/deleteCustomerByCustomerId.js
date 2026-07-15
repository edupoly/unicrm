import { z } from "zod";
import customerIdValidator from "../uuid/customerId.js";

const deleteCustomerByCustomerIdValidator = z.object({
    id: customerIdValidator
});

export { deleteCustomerByCustomerIdValidator };
