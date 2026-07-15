const ITEM_FIELDS_OBJ = {
    omit: {
        tenantId: true
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
        },
        productDetails: {
            omit: {
                itemId: true,
            }
        },
        serviceDetails: {
            omit: {
                itemId: true,
            }
        }
    }
};

const ITEM_TYPE_PRODUCT = 'PRODUCT';
const ITEM_TYPE_SERVICE = 'SERVICE';

export {
    ITEM_FIELDS_OBJ,
    ITEM_TYPE_PRODUCT,
    ITEM_TYPE_SERVICE
};
