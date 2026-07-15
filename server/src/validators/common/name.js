import { z } from "zod";
import nameValidationErrors from "../../errors/common/name.js";

const { REQUIRED_NAME, INVALID_NAME } = nameValidationErrors;

const nameValidator = z
    .string(REQUIRED_NAME)
    .min(3, INVALID_NAME);

export default nameValidator;
