import updateItemByItemIdService from "../../services/items/updateItemByItemIdService.js";
import sendResponse from "../../utils/common/sendResponse.js";

const updateItemByItemId = async (req, res, next) => {
    const { tenantId, userId } = req.user;

    const { productDetails, serviceDetails, id: itemId, ...item } = req.body;

    if (!Object.keys(item).length && (!productDetails || !serviceDetails)) {
        return sendResponse(res, 400, false, 'At least one field should change to update the item');
    }

    item.updatedBy = userId;

    const productToUpdate = {};
    const serviceToUpdate = {};

    if (productDetails) {
        productToUpdate.update = {
            ...productDetails
        };
    }

    else if (serviceDetails) {
        serviceToUpdate.update = {
            ...serviceDetails
        };
    }

    const result = await updateItemByItemIdService(tenantId, itemId, item, productDetails, serviceDetails);

    return sendResponse(res, 200, true, 'Item updated successfully', result);
};

export { updateItemByItemId };
