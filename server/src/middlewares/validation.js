const { z } = require("zod");

const sendResponse = require("../utils/common/sendResponse");

const { REQUEST_INPUT_BODY } = require("../constants/common");

const validation = (schema, input = REQUEST_INPUT_BODY) => {
    return (req, res, next) => {
        const validation = z.safeParse(schema, req[input]);

        if (validation.success) return next();

        return next(validation.error);
    }
};

module.exports = validation;