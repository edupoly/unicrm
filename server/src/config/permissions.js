const PERMISSIONS = {
    USERS: {
        CREATE: {
            name: "create",
            resource: "users",
            description: "Allow adding new employees or staff members"
        },
        READ: {
            name: "read",
            resource: "users",
            description: "Allow viewing the list of employees and their details"
        },
        UPDATE: {
            name: "update",
            resource: "users",
            description: "Allow editing employee roles, status, or details"
        },
        DELETE: {
            name: "delete",
            resource: "users",
            description: "Allow removing an employee from the system"
        }
    },

    PRODUCTS: {
        CREATE: {
            name: "create",
            resource: "products",
            description: "Allow adding new physical inventory items"
        },
        READ: {
            name: "read",
            resource: "products",
            description: "Allow looking up items, tracking stock, or scanning barcodes"
        },
        UPDATE: {
            name: "update",
            resource: "products",
            description: "Allow updating item prices, stock counts, or details"
        },
        DELETE: {
            name: "delete",
            resource: "products",
            description: "Allow removing products from active selection lists"
        }
    },

    SERVICES: {
        CREATE: {
            name: "create",
            resource: "services",
            description: "Allow defining new treatments, tasks, or clinical tests"
        },
        READ: {
            name: "read",
            resource: "services",
            description: "Allow looking up available business services and pricing"
        },
        UPDATE: {
            name: "update",
            resource: "services",
            description: "Allow editing service durations, availability flags, or base prices"
        },
        DELETE: {
            name: "delete",
            resource: "services",
            description: "Allow removing services from active business operations"
        }
    },

    CUSTOMERS: {
        CREATE: {
            name: "create",
            resource: "customers",
            description: "Allow registering a new customer profile at checkout"
        },
        READ: {
            name: "read",
            resource: "customers",
            description: "Allow searching customer profiles by mobile phone numbers"
        },
        UPDATE: {
            name: "update",
            resource: "customers",
            description: "Allow updating customer addresses or personal profiles"
        },
        DELETE: {
            name: "delete",
            resource: "customers",
            description: "Allow removing customer entries from the management system"
        }
    },

    INVOICES: {
        CREATE: {
            name: "create",
            resource: "invoices",
            description: "Allow processing transactions, checking out carts, and printing receipts"
        },
        READ: {
            name: "read",
            resource: "invoices",
            description: "Allow looking up historical bills, transaction logs, or past customer receipts"
        },
        UPDATE: {
            name: "update",
            resource: "invoices",
            description: "Allow changing order payment statuses (e.g., changing PENDING to PAID)"
        },
        DELETE: {
            name: "delete",
            resource: "invoices",
            description: "Allow cancelling or voiding an transaction entry"
        }
    },

    ANALYTICS: {
        READ: {
            name: "read",
            resource: "analytics",
            description: "Allow access to total revenue graphs, profit trends, and low-stock alerts"
        }
    },

    ROLES: {
        MANAGE: {
            name: "manage",
            resource: "roles",
            description: "Allow owners to build custom roles and assign permissions to staff templates"
        }
    }
};

module.exports = { PERMISSIONS };