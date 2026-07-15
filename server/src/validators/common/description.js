import { z } from "zod";
import descriptionValidationErrors from "../../errors/common/description.js";

const { REQUIRED_DESCRIPTION, INVALID_DESCRIPTION } = descriptionValidationErrors;

const descriptionValidator = z
    .string(REQUIRED_DESCRIPTION)
    .min(7, INVALID_DESCRIPTION);

export default descriptionValidator;
