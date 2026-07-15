import { z } from "zod";

import emailValidator from "./email.js";
import mobileNumberValidator from "./mobile.js";

import emailOrMobileNumberValidationErrors from "../../errors/common/emailOrMobileNumber.js";

const { INVALID_EMAIL_OR_MOBILE_NUMBER } = emailOrMobileNumberValidationErrors;

const emailOrMobileNumberValidator = z
    .union([emailValidator, mobileNumberValidator], INVALID_EMAIL_OR_MOBILE_NUMBER);

export default emailOrMobileNumberValidator;
