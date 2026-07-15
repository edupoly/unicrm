import prismaDB from "../../config/database.js";
import { ITEM_FIELDS_OBJ } from "../../constants/items.js";

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

export { addItemsByTenantIdService };
