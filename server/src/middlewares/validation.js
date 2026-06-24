const { z } = require("zod");

const sendResponse = require("../utils/sendResponse");

const validation = (schema) => {
    return (req, res, next) => {
        const validation = z.safeParse(schema);

        if (validation.success) return next();

        sendResponse(res, 400, false, 'Validation is failed', null, validation.error);
    }
};