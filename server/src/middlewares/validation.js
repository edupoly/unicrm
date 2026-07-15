import { z } from "zod";

import sendResponse from "../utils/common/sendResponse.js";

import { REQUEST_INPUT_BODY } from "../constants/common.js";

const validation = (schema, input = REQUEST_INPUT_BODY) => {
    return (req, res, next) => {
        const validation = z.safeParse(schema, req[input]);

        if (validation.success) return next();

        return next(validation.error);
    }
};

export default validation;
