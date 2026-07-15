import { z } from "zod";
import mobileNumberValidationErrors from "../../errors/common/mobile.js";

const { REQUIRED_MOBILE_NUMBER, INVALID_MOBILE_NUMBER } = mobileNumberValidationErrors;

const mobileNumberValidator = z
    .string(REQUIRED_MOBILE_NUMBER)
    .min(10, INVALID_MOBILE_NUMBER)
    .max(10, INVALID_MOBILE_NUMBER);

export default mobileNumberValidator;
