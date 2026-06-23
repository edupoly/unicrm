const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const systemPermissions = [
    // --- 1. USER & STAFF MANAGEMENT MODULE ---
    { name: "create", resource: "users", description: "Allow adding new employees or staff members" },
    { name: "read", resource: "users", description: "Allow viewing the list of employees and their details" },
    { name: "update", resource: "users", description: "Allow editing employee roles, status, or details" },
    { name: "delete", resource: "users", description: "Allow removing an employee from the system" },

    // --- 2. PRODUCTS MODULE (Inventory) ---
    { name: "create", resource: "products", description: "Allow adding new physical inventory items" },
    { name: "read", resource: "products", description: "Allow looking up items, tracking stock, or scanning barcodes" },
    { name: "update", resource: "products", description: "Allow updating item prices, stock counts, or details" },
    { name: "delete", resource: "products", description: "Allow removing products from active selection lists" },

    // --- 3. SERVICES MODULE (Consultations, Tests, Bookings) ---
    { name: "create", resource: "services", description: "Allow defining new treatments, tasks, or clinical tests" },
    { name: "read", resource: "services", description: "Allow looking up available business services and pricing" },
    { name: "update", resource: "services", description: "Allow editing service durations, availability flags, or base prices" },
    { name: "delete", resource: "services", description: "Allow removing services from active business operations" },

    // --- 4. CUSTOMER MODULE ---
    { name: "create", resource: "customers", description: "Allow registering a new customer profile at checkout" },
    { name: "read", resource: "customers", description: "Allow searching customer profiles by mobile phone numbers" },
    { name: "update", resource: "customers", description: "Allow updating customer addresses or personal profiles" },
    { name: "delete", resource: "customers", description: "Allow removing customer entries from the management system" },

    // --- 5. BILLING ENGINE (Orders & Invoices) ---
    { name: "create", resource: "invoices", description: "Allow processing transactions, checking out carts, and printing receipts" },
    { name: "read", resource: "invoices", description: "Allow looking up historical bills, transaction logs, or past customer receipts" },
    { name: "update", resource: "invoices", description: "Allow changing order payment statuses (e.g., changing PENDING to PAID)" },
    { name: "delete", resource: "invoices", description: "Allow cancelling or voiding an transaction entry" },

    // --- 6. OWNER DASHBOARD ANALYTICS ---
    { name: "read", resource: "analytics", description: "Allow access to total revenue graphs, profit trends, and low-stock alerts" },

    // --- 7. ROLE & SECURITY CONFIGURATION ---
    { name: "manage", resource: "roles", description: "Allow owners to build custom roles and assign permissions to staff templates" }
];

async function seedGlobalData() {
    console.log('Seeding Global Data to your DB...')
    try {
        const permissionsCount = await prisma.permission.createMany({
            data: systemPermissions,
            skipDuplicates: true
        });
        console.log(`${permissionsCount.count} permissions are created successfully!`);
    }
    catch (error) {
        console.log('An error occurred: ', error);
    }
}

seedGlobalData();