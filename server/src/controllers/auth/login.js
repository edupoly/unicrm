const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { findMultipleUsers, findUser } = require('../../services/auth/login');


const sendResponse = require("../../utils/common/sendResponse");
const getCookieOptions = require('../../utils/common/getCookieOptions');

const { verifyEmailOrMobile, extractUserData } = require('../../utils/auth/login');

const { JWT_SECRET_KEY } = process.env;


const login = async (req, res, next) => {

    const { identifier, password } = req.body;

    const emailOrMobileNumber = verifyEmailOrMobile(identifier);

    const users = await findMultipleUsers(emailOrMobileNumber);

    if (!users || users.length === 0) {
        return sendResponse(res, 404, false, "We couldn't find any account");
    }

    // Extract users with same mobile or email and password in different tenants
    const validationResults = await Promise.all(
        users.map(async (user) => {
            const isValid = await bcrypt.compare(password, user.passwordHash);
            return isValid ? user : null;
        })
    );

    const validUsers = validationResults.filter(user => user !== null);

    if (validUsers.length === 0) {
        return sendResponse(res, 401, false, "Invalid email/mobile or password");
    }

    const isOnlyOneUserExists = validUsers.length === 1;
    const isMultipleUsersExists = validUsers.length > 1;

    // If single user exists with same mobile or email and password
    if (isOnlyOneUserExists) {
        const {
            id, name, email, tenantId, businessName, roles, permissions
        } = extractUserData(validUsers[0]);

        const jwtToken = jwt.sign(
            { userId: id, tenantId, permissions },
            JWT_SECRET_KEY,
            { expiresIn: '5d' }
        );

        res.cookie('actor_access', jwtToken, getCookieOptions(1000 * 60 * 60 * 24 * 5));

        return sendResponse(res, 200, true, 'Login Successful', {
            name, email, businessName, roles, permissions
        });
    }

    // If multiple users exists then ask users to select the tenant
    else if (isMultipleUsersExists) {
        const companies = validUsers.map(user =>
            ({ tenantId: user.tenant.id, businessName: user.tenant.businessName })
        );

        const jwtPayload = validUsers.map(user => ({
            userId: user.id,
            tenantId: user.tenant.id,
            businessName: user.tenant.businessName
        }));

        const selectionToken = jwt.sign({ accounts: jwtPayload }, JWT_SECRET_KEY, { expiresIn: '3m' });

        res.cookie('select_org', selectionToken, getCookieOptions(1000 * 60 * 3));

        return sendResponse(res, 200, true, 'Select the company you want to login', { companies });
    }
};

// Only if multiple users exists: Verify the selected company and create the session
const verifyUserCompany = async (req, res, next) => {
    const { tenantId, businessName } = req.body;

    const { select_org } = req.cookies;

    if (!select_org) {
        return sendResponse(res, 400, false, 'Time to select the company is finished, try login again.')
    }

    const { accounts: userCompanies } = jwt.verify(select_org, JWT_SECRET_KEY);

    const selectedCompany = userCompanies.find(
        userCompany => userCompany.tenantId === tenantId && userCompany.businessName === businessName
    );

    if (!selectedCompany) {
        return sendResponse(res, 400, false, 'Select a valid company');
    }

    const user = await findUser(selectedCompany.userId, selectedCompany.tenantId);

    const { id, name, email, roles, permissions } = extractUserData(user);

    const jwtToken = jwt.sign(
        { userId: id, tenantId, permissions },
        JWT_SECRET_KEY,
        { expiresIn: '5d' }
    );

    res.clearCookie('select_org', getCookieOptions());

    res.cookie('actor_access', jwtToken, getCookieOptions(1000 * 60 * 60 * 24 * 5));

    return sendResponse(res, 200, true, 'Login Successfull', {
        name, email, businessName, roles, permissions
    });
};

module.exports = { login, verifyUserCompany };