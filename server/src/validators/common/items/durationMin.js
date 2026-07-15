import { z } from "zod";
import { REQUIRED_DURATION_MIN, INVALID_DURATION_MIN } from "../../../errors/items/durationMin.js";

const durationMinValidator = z
    .number(REQUIRED_DURATION_MIN)
    .min(1, INVALID_DURATION_MIN);

export default durationMinValidator;
