import { z } from 'zod';
import { REQUIRED_ROLE_ID, INVALID_ROLE_ID } from '../../errors/uuid/roleId.js';

const roleIdValidator = z
    .string(REQUIRED_ROLE_ID)
    .uuid(INVALID_ROLE_ID);

export default roleIdValidator;
