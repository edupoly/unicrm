import { z } from "zod";
import businessNameValidationErrors from "../../errors/common/businessName.js";

const { REQUIRED_BUSINESS_NAME, INVALID_BUSINESS_NAME } = businessNameValidationErrors;

const businessNameValidator = z
    .string(REQUIRED_BUSINESS_NAME)
    .min(3, INVALID_BUSINESS_NAME);

export default businessNameValidator;
