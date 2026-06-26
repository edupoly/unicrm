const { z } = require('zod');
const { REQUIRED_ROLE } = require('../../errors/common/role');
const { INVALID_EMAIL } = require('../../errors/common/email');

const roleValidator = z
    .string(REQUIRED_ROLE)
    .min(INVALID_EMAIL);

module.exports = roleValidator;