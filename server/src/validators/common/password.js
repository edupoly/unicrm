import { z } from "zod";
import passwordValidationErrors from "../../errors/common/password.js";

const { REQUIRED_PASSWORD, INVALID_PASSWORD } = passwordValidationErrors;

const passwordValidator = z
    .string(REQUIRED_PASSWORD)
    .min(8, INVALID_PASSWORD);

export default passwordValidator;
