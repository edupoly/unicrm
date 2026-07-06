const { PrismaClient } = require('@prisma/client');
const { getPermissionsService } = require('../src/services/permissions/getPermissionsService');

const prisma = new PrismaClient();

const systemPermissions = [
    // --- 1. USER & STAFF MANAGEMENT MODULE ---
    { name: "create", resource: "users", description: "Allow adding new employees or staff members" },
    { name: "read", resource: "users", description: "Allow viewing the list of employees and their details" },
    { name: "update", resource: "users", description: "Allow editing employee roles, status, or details" },
    { name: "delete", resource: "users", description: "Allow removing an employee from the system" },

    // --- 2. UNIFIED ITEMS MODULE (Products & Services Catalog) ---
    { name: "create", resource: "items", description: "Allow creating new catalog offerings (both physical products and services)" },
    { name: "read", resource: "items", description: "Allow viewing the catalog list, tracking stock levels, and looking up service rates" },
    { name: "update", resource: "items", description: "Allow modifying prices, adjusting stock counts, and changing service details" },
    { name: "delete", resource: "items", description: "Allow removing items or services from active selection lists" },

    // --- 3. CUSTOMER MODULE ---
    { name: "create", resource: "customers", description: "Allow registering a new customer profile at checkout" },
    { name: "read", resource: "customers", description: "Allow searching customer profiles by mobile phone numbers" },
    { name: "update", resource: "customers", description: "Allow updating customer addresses or personal profiles" },
    { name: "delete", resource: "customers", description: "Allow removing customer entries from the management system" },

    // --- 4. BILLING ENGINE (Orders & Invoices) ---
    { name: "create", resource: "invoices", description: "Allow processing transactions, checking out carts, and printing receipts" },
    { name: "read", resource: "invoices", description: "Allow looking up historical bills, transaction logs, or past customer receipts" },
    { name: "update", resource: "invoices", description: "Allow changing order payment statuses (e.g., changing PENDING to PAID)" },
    { name: "delete", resource: "invoices", description: "Allow cancelling or voiding a transaction entry" },

    // --- 5. OWNER DASHBOARD ANALYTICS ---
    { name: "read", resource: "analytics", description: "Allow access to total revenue graphs, profit trends, and dashboard performance counters" },

    // --- 6. ROLE & SECURITY CONFIGURATION ---
    { name: "manage", resource: "roles", description: "Allow owners to build custom roles and assign permissions to staff templates" }
];

async function seedGlobalData() {

    const DBPermissions = getPermissionsService();

    if (DBPermissions.length === systemPermissions.length) {
        return console.log("Permissions Seeding Already Completed...")
    }
    
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