import { z } from "zod";
import { REQUIRED_CUSTOMER_ID, INVALID_CUSTOMER_ID } from "../../errors/uuid/customerId.js";

const customerIdValidator = z
    .string(REQUIRED_CUSTOMER_ID)
    .uuid(INVALID_CUSTOMER_ID);

export default customerIdValidator;
