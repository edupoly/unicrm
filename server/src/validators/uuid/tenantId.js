import { z } from 'zod';
import { REQUIRED_TENANT_ID, INVALID_TENANT_ID } from '../../errors/uuid/tenantId.js';

const tenantIdValidator = z
    .string(REQUIRED_TENANT_ID)
    .uuid(INVALID_TENANT_ID);

export default tenantIdValidator;
