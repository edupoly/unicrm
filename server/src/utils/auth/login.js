const verifyEmailOrMobile = (identifier) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier);

    const emailOrMobileNumber = isEmail
        ? { email: identifier }
        : { mobileNumber: identifier };

    return emailOrMobileNumber;
};

const extractUserData = (userData) => {
    const { id, name, email, mobileNumber, tenantId, tenant: { businessName }, userRoles } = userData;

    const roles = userRoles.map(userRole => userRole.role.name);

    const permissions = userRoles.map(userRole => userRole.role.rolePermissions.map(p => p.permission)).flat(1);

    return {
        id,
        name,
        email,
        mobileNumber,
        tenantId,
        businessName,
        roles,
        permissions
    };
};

const getUserSessionJwtPayload = (userId, tenantId, permissions) => {
    return { userId, tenantId, permissions };
};

const getCompanySelectionSessionJwtPayload = (accounts) => {
    return { accounts };
};

const getResponsePayload = (name, email, mobileNumber, businessName, roles, permissions) => {
    return { name, email, mobileNumber, businessName, roles, permissions };
};

export {
    verifyEmailOrMobile, extractUserData,
    getUserSessionJwtPayload,
    getCompanySelectionSessionJwtPayload,
    getResponsePayload
};
