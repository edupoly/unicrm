const { z } = require('zod');
const { REQUIRED_ROLE, INVALID_ROLE } = require('../../errors/common/role');

const roleNameValidator = z
    .string(REQUIRED_ROLE)
    .min(3, INVALID_ROLE);

module.exports = roleNameValidator;