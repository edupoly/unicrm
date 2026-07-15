import bcrypt from 'bcrypt';

import registerBusinessAndOwner from '../../services/auth/register.js';

import getCookieOptions from '../../utils/common/getCookieOptions.js';
import sendResponse from '../../utils/common/sendResponse.js';

import {
    getUserSessionJwtPayload,
    getResponsePayload
} from '../../utils/auth/login.js';

import { createJwtToken } from '../../utils/common/createVerifyJwtToken.js';

import {
    USER_SESSION_TIME_JWT,
    USER_SESSION_TIME_COOKIE,
    USER_SESSION_COOKIE_NAME,
    REGISTRATION_SUCCESSFUL_MSG
} from '../../constants/auth.js';


const { BCRYPT_SALT_ROUNDS } = process.env;


const register = async (req, res, next) => {
    const {
        businessName, name,
        email, mobileNumber,
        password, roleName
    } = req.body;

    const passwordHash = await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS));

    const result = await registerBusinessAndOwner({
        businessName, name, email, mobileNumber,
        passwordHash, roleName
    });

    const jwtToken = createJwtToken(
        getUserSessionJwtPayload(result.userId, result.tenantId, result.permissions),
        USER_SESSION_TIME_JWT
    );

    res.cookie(
        USER_SESSION_COOKIE_NAME,
        jwtToken,
        getCookieOptions(USER_SESSION_TIME_COOKIE)
    );

    return sendResponse(res, 201, true,
        REGISTRATION_SUCCESSFUL_MSG,
        getResponsePayload(name, email, mobileNumber, businessName, result.roles, result.permissions)
    );
};

export { register };
