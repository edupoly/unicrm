const bcrypt = require('bcrypt');

const registerBusinessAndOwner = require('../../services/auth/register');

const getCookieOptions = require('../../utils/common/getCookieOptions');
const sendResponse = require('../../utils/common/sendResponse');

const {
    getUserSessionJwtPayload,
    getResponsePayload
} = require('../../utils/auth/login');

const { createJwtToken } = require('../../utils/common/createVerifyJwtToken');

const {
    USER_SESSION_TIME_JWT,
    USER_SESSION_TIME_COOKIE,
    USER_SESSION_COOKIE_NAME,
    REGISTRATION_SUCCESSFUL_MSG
} = require('../../constants/auth');


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

    const permissions = result.permissions.map(({ id, ...p }) => p);

    const jwtToken = createJwtToken(
        getUserSessionJwtPayload(result.userId, result.tenantId, permissions),
        USER_SESSION_TIME_JWT
    );

    res.cookie(
        USER_SESSION_COOKIE_NAME,
        jwtToken,
        getCookieOptions(USER_SESSION_TIME_COOKIE)
    );

    return sendResponse(res, 201, true,
        REGISTRATION_SUCCESSFUL_MSG,
        getResponsePayload(name, email, businessName, result.roles, permissions)
    );
};

module.exports = { register };