const { v4: uuidV4 } = require('uuid');
const { addItemsByTenantIdService } = require("../../services/items/addItemsByTenantIdService");
const sendResponse = require("../../utils/common/sendResponse");
const { ITEM_TYPE_PRODUCT, ITEM_TYPE_SERVICE } = require('../../constants/items');

const addItemsByTenantId = async (req, res, next) => {
    const { tenantId, userId } = req.user;

    const { items } = req.body;

    const itemsToInsert = [];
    const productsToInsert = [];
    const servicesToInsert = [];

    items.forEach(item => {
        const generatedItemId = uuidV4();

        itemsToInsert.push({
            id: generatedItemId,
            tenantId,
            name: item.name,
            sku: item.sku || null,
            price: item.price,
            itemType: item.itemType,
            discountPercentage: item.discountPercentage,
            isOnSale: item.isOnSale,
            createdBy: userId,
            updatedBy: null,
            updatedAt: null,
            customFields: item.customFields
        });

        if (item.itemType === ITEM_TYPE_PRODUCT && item.productDetails) {
            productsToInsert.push({
                itemId: generatedItemId,
                costPrice: item.productDetails.costPrice || 0,
                stockQuantity: item.productDetails.stockQuantity || 0,
                minimumStockLevel: item.productDetails.minimumStockLevel || 5,
                customFields: item.productDetails.customFields
            });
        }

        else if (item.itemType === ITEM_TYPE_SERVICE && item.serviceDetails) {
            servicesToInsert.push({
                itemId: generatedItemId,
                durationMin: item.serviceDetails.durationMin || 0,
                customFields: item.serviceDetails.customFields
            });
        }
    });

    const result = await addItemsByTenantIdService(itemsToInsert, productsToInsert, servicesToInsert);

    const responseData = result.items.map(item => {
        if (item.itemType === ITEM_TYPE_PRODUCT) {
            item.productDetails = result.products.find(p => item.id === p.itemId) || null;
            delete item.productDetails?.itemId;
        }

        else if (item.itemType === ITEM_TYPE_SERVICE) {
            item.serviceDetails = result.services.find(p => item.id === p.itemId) || null;
            delete item.serviceDetails?.itemId;
        }

        return item;
    });

    return sendResponse(res, 201, true, 'Items created successfully', responseData);
};

module.exports = { addItemsByTenantId };