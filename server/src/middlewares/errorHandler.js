const { ZodError } = require("zod");
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require("@prisma/client/runtime/library");
const { JsonWebTokenError } = require("jsonwebtoken");

const sendResponse = require("../utils/common/sendResponse");
const getZodErrors = require("../utils/common/getZodErrors");

const { INVALID_REQUEST } = require("../errors/common/commonValidation");

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
    }

    else if (err instanceof PrismaClientValidationError) {
        return sendResponse(res, 400, false, INVALID_REQUEST);
    }

    else if (err instanceof JsonWebTokenError) {
        return sendResponse(res, 403, false, 'Access Denied: Token got expired');
    }

    return sendResponse(res, 500, false, 'Something went wrong in the Server!');
};

module.exports = errorHandler;