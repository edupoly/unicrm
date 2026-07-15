import express from 'express';

import { getPermissions } from '../controllers/permissions/getPermissions.js';

const permissionsRouter = express.Router();

permissionsRouter.get('/', getPermissions);

export { permissionsRouter };
