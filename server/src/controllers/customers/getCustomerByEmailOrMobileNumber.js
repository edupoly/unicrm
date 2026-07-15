import { getCustomerByEmailOrMobileNumberService } from "../../services/customers/getCustomerByEmailOrMobileNumberService.js";
import { verifyEmailOrMobile } from "../../utils/auth/login.js";

import sendResponse from "../../utils/common/sendResponse.js";

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

export { getCustomerByEmailOrMobileNumber };
