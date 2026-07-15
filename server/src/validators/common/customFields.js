import { z } from "zod";
import customFieldsValidationErrors from "../../errors/common/customFields.js";

const { INVALID_CUSTOM_FIELDS } = customFieldsValidationErrors;

const customFieldsValidator = z
    .object({}, INVALID_CUSTOM_FIELDS)
    .optional();

export default customFieldsValidator;
