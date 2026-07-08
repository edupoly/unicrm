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

module.exports = { ITEM_FIELDS_OBJ };