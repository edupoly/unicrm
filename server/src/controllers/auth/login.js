const bcrypt = require('bcrypt');

const { findMultipleUsers, findUser } = require('../../services/auth/login');


const sendResponse = require("../../utils/common/sendResponse");
const getCookieOptions = require('../../utils/common/getCookieOptions');
const { createJwtToken, verifyJwtToken } = require('../../utils/common/createVerifyJwtToken');


const { verifyEmailOrMobile, extractUserData,
    getUserSessionJwtPayload,
    getCompanySelectionSessionJwtPayload,
    getResponsePayload
} = require('../../utils/auth/login');


const { USER_SESSION_TIME_JWT, USER_SESSION_TIME_COOKIE,
    COMPANY_SELECTION_SESSION_TIME_JWT, COMPANY_SELECTION_SESSION_TIME_COOKIE,
    USER_SESSION_COOKIE_NAME, COMPANY_SELECTION_SESSION_COOKIE_NAME,
    LOGIN_SUCCESSFUL_MSG
} = require('../../constants/auth');


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

        const userSessionJwtToken = createJwtToken(
            getUserSessionJwtPayload(id, tenantId, permissions),
            USER_SESSION_TIME_JWT
        );

        res.cookie(
            USER_SESSION_COOKIE_NAME,
            userSessionJwtToken,
            getCookieOptions(USER_SESSION_TIME_COOKIE)
        );

        return sendResponse(res, 200, true,
            LOGIN_SUCCESSFUL_MSG,
            getResponsePayload(name, email, businessName, roles, permissions)
        );
    }

    // If multiple users exists then ask users to select the tenant
    else if (isMultipleUsersExists) {
        const companies = validUsers.map(user =>
            ({ tenantId: user.tenant.id, businessName: user.tenant.businessName })
        );

        const accounts = validUsers.map(user => ({
            userId: user.id,
            tenantId: user.tenant.id,
            businessName: user.tenant.businessName
        }));

        const companySelectionJwtToken = createJwtToken(
            getCompanySelectionSessionJwtPayload(accounts),
            COMPANY_SELECTION_SESSION_TIME_JWT
        );

        res.cookie(
            COMPANY_SELECTION_SESSION_COOKIE_NAME,
            companySelectionJwtToken,
            getCookieOptions(COMPANY_SELECTION_SESSION_TIME_COOKIE)
        );

        return sendResponse(res, 200, true,
            'Select the company you want to login',
            { companies }
        );
    }
};

// Only if multiple users exists: Verify the selected company and create the session
const verifyUserCompany = async (req, res, next) => {
    const { tenantId, businessName } = req.body;

    const { select_org } = req.cookies;

    if (!select_org) {
        return sendResponse(res, 400, false,
            'Time to select the company is finished, try login again.'
        );
    }

    const { accounts: userCompanies } = verifyJwtToken(select_org);

    const selectedCompany = userCompanies.find(
        userCompany => userCompany.tenantId === tenantId && userCompany.businessName === businessName
    );

    if (!selectedCompany) {
        return sendResponse(res, 400, false, 'Select a valid company');
    }

    const user = await findUser(selectedCompany.userId, selectedCompany.tenantId);

    const { id, name, email, roles, permissions } = extractUserData(user);

    const userSessionJwtToken = createJwtToken(
        getUserSessionJwtPayload(id, tenantId, permissions),
        USER_SESSION_TIME_JWT
    );

    res.clearCookie(COMPANY_SELECTION_SESSION_COOKIE_NAME, getCookieOptions());

    res.cookie(
        USER_SESSION_COOKIE_NAME,
        userSessionJwtToken,
        getCookieOptions(USER_SESSION_TIME_COOKIE)
    );

    return sendResponse(res, 200, true,
        LOGIN_SUCCESSFUL_MSG,
        getResponsePayload(name, email, businessName, roles, permissions)
    );
};

module.exports = { login, verifyUserCompany };