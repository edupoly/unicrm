import { z } from "zod";
import customFieldsValidator from "../customFields.js";
import durationMinValidator from "./durationMin.js";

const serviceDetailsValidator = z.object({
    durationMin: durationMinValidator,
    customFields: customFieldsValidator
}).strict();

export default serviceDetailsValidator;
