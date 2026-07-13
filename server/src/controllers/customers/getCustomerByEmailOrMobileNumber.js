const { getCustomerByEmailOrMobileNumberService } = require("../../services/customers/getCustomerByEmailOrMobileNumberService");
const { verifyEmailOrMobile } = require("../../utils/auth/login");

const sendResponse = require("../../utils/common/sendResponse");

const getCustomerByEmailOrMobileNumber = async (req, res, next) => {
    const { tenantId } = req.user;

    const { identifier } = req.body;

    const emailOrMobileNumber = verifyEmailOrMobile(identifier);

    const isMobileNumber = emailOrMobileNumber?.mobileNumber ? true : false;

    const condition = {};

    if (isMobileNumber) {
        condition.tenantId_mobileNumber = {
            tenantId,
            ...emailOrMobileNumber
        }
    }

    else {
        condition.tenantId_email = {
            tenantId,
            ...emailOrMobileNumber
        }
    }

    const customer = await getCustomerByEmailOrMobileNumberService(condition);

    return sendResponse(res, 200, true, 'Customer fetched successfully', customer);
};

module.exports = { getCustomerByEmailOrMobileNumber };