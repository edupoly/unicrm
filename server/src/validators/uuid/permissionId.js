const { z } = require('zod');
const { REQUIRED_PERMISSION_ID, INVALID_PERMISSION_ID } = require('../../errors/uuid/permissionId');

const permissionIdValidator = z
    .string(REQUIRED_PERMISSION_ID)
    .uuid(INVALID_PERMISSION_ID);

module.exports = permissionIdValidator;