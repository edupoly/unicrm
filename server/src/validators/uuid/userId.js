import { z } from 'zod';
import { REQUIRED_USER_ID, INVALID_USER_ID } from '../../errors/uuid/userId.js';

const userIdValidator = z
    .string(REQUIRED_USER_ID)
    .uuid(INVALID_USER_ID);

export default userIdValidator;
