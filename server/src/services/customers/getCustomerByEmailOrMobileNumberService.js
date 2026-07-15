import prismaDB from "../../config/database.js";

const getCustomerByEmailOrMobileNumberService = async (condition) => {
    const customer = await prismaDB.customer.findUniqueOrThrow({
        where: condition,
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

export { getCustomerByEmailOrMobileNumberService };
