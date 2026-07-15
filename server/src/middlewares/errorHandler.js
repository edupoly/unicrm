import { ZodError } from "zod";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import pkg from "jsonwebtoken";

import sendResponse from "../utils/common/sendResponse.js";
import getZodErrors from "../utils/common/getZodErrors.js";

import { INVALID_REQUEST } from "../errors/common/commonValidation.js";

const { JsonWebTokenError } = pkg;

const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err instanceof ZodError) {
        const zodValidationErrors = getZodErrors(err.issues);
        return sendResponse(res, 400, false, INVALID_REQUEST, null, zodValidationErrors);
    }

    else if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return sendResponse(res, 404, false, `${err.meta.modelName} not found`);
        }
        else if (err.code === 'P2002') {
            return sendResponse(res, 409, false, `${err.meta.modelName} already exists`);
        }
    }

    else if (err instanceof PrismaClientValidationError) {
        return sendResponse(res, 400, false, INVALID_REQUEST);
    }

    else if (err instanceof JsonWebTokenError) {
        return sendResponse(res, 403, false, 'Access Denied: Token got expired or modified');
    }

    return sendResponse(res, 500, false, 'Something went wrong in the Server!');
};

export default errorHandler;
