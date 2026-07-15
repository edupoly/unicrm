import { z } from 'zod';
import roleValidationErrors from '../../errors/common/role.js';

const { REQUIRED_ROLE, INVALID_ROLE } = roleValidationErrors;

const roleNameValidator = z
    .string(REQUIRED_ROLE)
    .min(3, INVALID_ROLE);

export default roleNameValidator;
