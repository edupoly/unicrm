const { z } = require('zod');
const { REQUIRED_ROLE_ID, INVALID_ROLE_ID } = require('../../errors/uuid/roleId');

const roleIdValidator = z
    .string(REQUIRED_ROLE_ID)
    .uuid(INVALID_ROLE_ID);

module.exports = roleIdValidator;