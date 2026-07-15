import prismaDB from "../../config/database.js";

const updateItemByItemIdService = async (tenantId, itemId, item, productDetails, serviceDetails) => {
    const result = await prismaDB.item.update({
        data: {
            ...item,
            productDetails,
            serviceDetails
        },
        where: { tenantId, id: itemId },
        omit: {
            tenantId: true,
            createdBy: true,
            updatedBy: true
        },
        include: {
            creator: {
                select: { name: true }
            },
            updater: {
                select: { name: true }
            },
            productDetails: {
                omit: { itemId: true }
            },
            serviceDetails: {
                omit: { itemId: true }
            }
        }
    });

    return result;
};

export default updateItemByItemIdService;
