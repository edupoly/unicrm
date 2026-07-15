import express from 'express';

import validation from '../middlewares/validation.js';


import { loginValidator, verifyUserCompanyValidator } from '../validators/auth/login.js';
import { login, verifyUserCompany } from '../controllers/auth/login.js';

import { registerValidator } from '../validators/auth/register.js';
import { register } from '../controllers/auth/register.js';


const authRouter = express.Router();

authRouter.post('/login', validation(loginValidator), login);
// ====================================================================
// ROUTE 1: POST /api/auth/login
// ====================================================================

// FRONTEND REQUEST BODY:
// {
//   "identifier": "alex@email.com",   // Can be email or mobile number
//   "password": "user_password_123"
// }

// BACKEND RESPONSE CASE A (Single account found):
// Status: 200 OK
// Sets Cookie: 'actor_access' (JWT session token valid for 5 days)
// {
//   "success": true,
//   "message": "Login Successful",
//   "data": {
//     "name": "Alex Kumar",
//     "email": "alex@email.com",
//     "businessName": "Apex Tech Solutions",
//     "roles": ["Manager"],
//     "permissions": [{"name":"create", "resource":"products", "name":"read","resource":"products"]
//   }
// }

// BACKEND RESPONSE CASE B (Multiple accounts found with same credentials):
// Status: 200 OK
// Sets Cookie: 'select_org' (Short-lived selection JWT valid for 3 minutes)
// {
//   "success": true,
//   "message": "Select the company you want to login",
//   "data": {
//     "companies": [{tenantId,businessName:"Apex Tech Solutions"},
//                   {tenantId,businessName:""Vertex Global""}]
//   }
// }
// =================================================================


authRouter.post('/login/verify-user-company',
    validation(verifyUserCompanyValidator),
    verifyUserCompany
);
// ====================================================================
// ROUTE 2: POST /api/auth/verify-company
// ====================================================================

// FRONTEND REQUEST BODY:
// Sends the 'select_org' cookie automatically along with this body:
// {
//   "tenantId": "uuid-tenant-111",    // The specific company ID selected by the user
//   "businessName": "Apex Tech Solutions"
// }

// BACKEND RESPONSE:
// Status: 200 OK
// Clears Cookie: 'select_org'
// Sets Cookie: 'actor_access' (JWT session token valid for 5 days)
// {
//   "success": true,
//   "message": "Login Successful",
//   "data": {
//     "name": "Alex Kumar",
//     "email": "alex@email.com",
//     "businessName": "Apex Tech Solutions",
//     "roles": ["Manager"],
//     "permissions": [{"name":"create", "resource":"products"}, {"name":"read","resource":"products"}]
//   }
// }
// =================================================================

authRouter.post('/register', validation(registerValidator), register);


export { authRouter };
