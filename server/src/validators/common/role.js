const { z } = require('zod');
const { REQUIRED_ROLE } = require('../../errors/common/role');

const roleValidator = z
    .string(REQUIRED_ROLE);

module.exports = roleValidator;