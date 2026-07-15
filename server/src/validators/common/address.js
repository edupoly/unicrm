import { z } from "zod";
import addressValidationErrors from "../../errors/common/address.js";

const { REQUIRED_ADDRESS, INVALID_ADDRESS } = addressValidationErrors;

const addressValidator = z
    .string(REQUIRED_ADDRESS)
    .min(6, INVALID_ADDRESS);

export default addressValidator;
