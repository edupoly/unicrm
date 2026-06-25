const { ZodError } = require("zod");
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require("@prisma/client/runtime/library");

const sendResponse = require("../utils/sendResponse");
const getZodErrors = require("../utils/getZodErrors");

const errorHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        const zodValidationErrors = getZodErrors(err.issues);
        return sendResponse(res, 400, false, 'Given inputs are invalid', null, zodValidationErrors);
    }
    else if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return sendResponse(res, 404, false, `${err.meta.modelName} not found`);
        }
    }
    else if (err instanceof PrismaClientValidationError) {
        return sendResponse(res, 400, false, 'The request is invalid');
    }
    return sendResponse(res, 500, false, 'Something went wrong in the Server!');
};

module.exports = errorHandler;