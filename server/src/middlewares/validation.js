const { z } = require("zod");

const sendResponse = require("../utils/sendResponse");

const validation = (schema) => {
    return (req, res, next) => {
        const validation = z.safeParse(schema, req.body);

        if (validation.success) return next();

        return next(validation.error);
    }
};

module.exports = validation;