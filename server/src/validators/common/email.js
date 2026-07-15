import { z } from "zod";
import emailValidationErrors from "../../errors/common/email.js";

const { REQUIRED_EMAIL, INVALID_EMAIL } = emailValidationErrors;

const emailValidator = z
    .string(REQUIRED_EMAIL)
    .email(INVALID_EMAIL);

export default emailValidator;
