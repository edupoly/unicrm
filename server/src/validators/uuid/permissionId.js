import { z } from 'zod';
import { REQUIRED_PERMISSION_ID, INVALID_PERMISSION_ID } from '../../errors/uuid/permissionId.js';

const permissionIdValidator = z
    .string(REQUIRED_PERMISSION_ID)
    .uuid(INVALID_PERMISSION_ID);

export default permissionIdValidator;
