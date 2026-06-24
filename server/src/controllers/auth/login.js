const prismaDB = require("../../config/database");

const sendResponse = require("../../utils/sendResponse");

// Issue: Allow the users to login through either (email & password) | (mobileNumber & password)
const login = async (error, req, res, next) => {
    const { tenantId, role, mobileNumber, email, password } = req.body;

    const user = await prismaDB.user.findUnique({
        where: {
            tenantId_email: { tenantId, email },
            tenantId_mobileNumber: { tenantId, mobileNumber },
            passwordHash: password
        }
    });

    if (!user) {
        // error = { code: 404, message: 'User not found' };
        return sendResponse(res, 404, false, 'User not found', null, null);
    }

    return sendResponse(res, 200, true, 'User authenticated successfully', user, null);
};

module.exports = login;