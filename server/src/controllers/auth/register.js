const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerBusinessAndOwner = require('../../services/auth/register');

const getCookieOptions = require('../../utils/common/getCookieOptions');
const sendResponse = require('../../utils/common/sendResponse');


const { BCRYPT_SALT_ROUNDS, JWT_SECRET_KEY } = process.env;


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

    const jwtToken = jwt.sign(
        { userId: result.userId, tenantId: result.tenantId, permissions },
        JWT_SECRET_KEY,
        { expiresIn: '5d' }
    );

    res.cookie('actor_access', jwtToken, getCookieOptions(1000 * 60 * 60 * 24 * 5));

    return sendResponse(res, 201, true, 'Registration Successful',
        { name, email, businessName, roles: result.roles, permissions }
    );
};

module.exports = { register };