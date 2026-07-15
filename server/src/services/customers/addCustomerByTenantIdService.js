import prismaDB from "../../config/database.js";

const addCustomerByTenantIdService = async (
    tenantId, userId, name, mobileNumber,
    email = null, address = null, customFields = {}
) => {
    const customer = await prismaDB.customer.create({
        data: {
            tenantId,
            name,
            mobileNumber,
            email,
            address,
            customFields,
            createdBy: userId,
            updatedAt: null
        },
        omit: {
            tenantId: true,
            createdBy: true,
            updatedBy: true
        },
        include: {
            creator: {
                select: {
                    name: true
                }
            },
            updater: {
                select: {
                    name: true
                }
            }
        }
    });
    return customer;
};

export { addCustomerByTenantIdService };
