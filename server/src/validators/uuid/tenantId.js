const { z } = require('zod');
const { REQUIRED_TENANT_ID, INVALID_TENANT_ID } = require('../../errors/uuid/tenantId');

const tenantIdValidator = z
    .string(REQUIRED_TENANT_ID)
    .uuid(INVALID_TENANT_ID);

module.exports = tenantIdValidator;