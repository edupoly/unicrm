const { z } = require('zod');
const { REQUIRED_USER_ID, INVALID_USER_ID } = require('../../errors/uuid/userId');

const userIdValidator = z
    .string(REQUIRED_USER_ID)
    .uuid(INVALID_USER_ID);

module.exports = userIdValidator;