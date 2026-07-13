const prismaDB = require("../../config/database");
const { ITEM_FIELDS_OBJ } = require("../../constants/items");

const addItemsByTenantIdService = async (items, products, services) => {
    const result = await prismaDB.$transaction(async (tx) => {
        const insertedItems = await tx.item.createManyAndReturn({
            data: items,
            omit: {
                tenantId: true,
                createdBy: true,
                updatedBy: true
            },
            include: {
                creator: {
                    select: { name: true }
                }
            }
        });

        const insertedProducts = await tx.productDetail.createManyAndReturn({
            data: products
        });

        const insertedServices = await tx.serviceDetail.createManyAndReturn({
            data: services
        });

        return { items: insertedItems, products: insertedProducts, services: insertedServices };
    });

    return result;
};

module.exports = { addItemsByTenantIdService };