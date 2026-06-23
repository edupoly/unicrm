const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tenantId = 'a7865a05-e67b-4609-970d-aa8393b14204';

// staff
const medicineStaffId = '57b252d6-ef3d-4fef-bdb9-d059b1b2da88';
const STAFF_ID = 'ccb795ff-21b0-4fc6-b65b-3a993c496182';
const staffEmail = 'naga@arjuna.com';
const staffPassword = 'nagarjuna';

// owner
const roleId = 'ee51907c-7cb3-4a0c-ad71-e6fe0e4ddba6';
const userId = '83e763cd-4e5a-4b66-986e-49ea957dcce8';
const email = 'venky@mowa.com';
const passwordHash = 'venkymowa';

async function seeding() {
    //const allPermissions = await prisma.permission.findMany();

    const products = [
        {
            tenantId,

            name: "Paracetamol 500mg",
            sku: "MED-001",

            costPrice: 12.50,
            sellingPrice: 18.00,

            stockQuantity: 250,

            discountPercentage: 5,
            isOnSale: true,

            customFields: {
                manufacturer: "Cipla",
                expiryDate: "2027-05-31",
                batchNumber: "PCM2401",
                medicineType: "Tablet",
                dosage: "500mg",
                requiresPrescription: false
            }
        },

        {
            tenantId,

            name: "Azithromycin 500mg",
            sku: "MED-002",

            costPrice: 85.00,
            sellingPrice: 110.00,

            stockQuantity: 75,

            discountPercentage: 0,
            isOnSale: true,

            customFields: {
                manufacturer: "Sun Pharma",
                expiryDate: "2027-10-15",
                batchNumber: "AZM1105",
                medicineType: "Tablet",
                dosage: "500mg",
                requiresPrescription: true
            }
        },

        {
            tenantId,

            name: "Benadryl Cough Syrup",
            sku: "MED-003",

            costPrice: 92.00,
            sellingPrice: 120.00,

            stockQuantity: 40,

            discountPercentage: 10,
            isOnSale: true,

            customFields: {
                manufacturer: "Johnson & Johnson",
                expiryDate: "2027-08-20",
                batchNumber: "BEN4401",
                medicineType: "Syrup",
                dosage: "100ml",
                requiresPrescription: false
            }
        },

        {
            tenantId,

            name: "Dolo 650",
            sku: "MED-004",

            costPrice: 24.00,
            sellingPrice: 32.00,

            stockQuantity: 180,

            discountPercentage: 5,
            isOnSale: true,

            customFields: {
                manufacturer: "Micro Labs",
                expiryDate: "2028-01-30",
                batchNumber: "DOL650X",
                medicineType: "Tablet",
                dosage: "650mg",
                requiresPrescription: false
            }
        },

        {
            tenantId,

            name: "Vitamin D3 Capsules",
            sku: "MED-005",

            costPrice: 145.00,
            sellingPrice: 180.00,

            stockQuantity: 90,

            discountPercentage: 15,
            isOnSale: true,

            customFields: {
                manufacturer: "Abbott",
                expiryDate: "2028-03-10",
                batchNumber: "VD3409",
                medicineType: "Capsule",
                dosage: "60000 IU",
                requiresPrescription: false
            }
        }
    ];

    const services = [
        {
            tenantId,

            name: "Blood Pressure Check",
            basePrice: 20.00,

            durationMin: 5,
            isAvailable: true,

            customFields: {
                technicianRequired: false,
                reportProvided: false,
                equipmentUsed: "Digital BP Monitor",
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "Blood Sugar Test",
            basePrice: 50.00,

            durationMin: 10,
            isAvailable: true,

            customFields: {
                technicianRequired: true,
                reportProvided: true,
                equipmentUsed: "Glucometer",
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "Injection Administration",
            basePrice: 80.00,

            durationMin: 15,
            isAvailable: true,

            customFields: {
                technicianRequired: true,
                reportProvided: false,
                equipmentUsed: "Injection Kit",
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "Nebulization",
            basePrice: 150.00,

            durationMin: 20,
            isAvailable: true,

            customFields: {
                technicianRequired: true,
                reportProvided: false,
                equipmentUsed: "Nebulizer",
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "First Aid Dressing",
            basePrice: 120.00,

            durationMin: 20,
            isAvailable: true,

            customFields: {
                technicianRequired: true,
                reportProvided: false,
                equipmentUsed: "Dressing Kit",
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "BMI & Weight Check",
            basePrice: 30.00,

            durationMin: 5,
            isAvailable: true,

            customFields: {
                technicianRequired: false,
                reportProvided: true,
                equipmentUsed: "BMI Scale",
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "Pharmacist Consultation",
            basePrice: 100.00,

            durationMin: 15,
            isAvailable: true,

            customFields: {
                technicianRequired: false,
                reportProvided: false,
                equipmentUsed: null,
                homeServiceAvailable: false
            }
        },

        {
            tenantId,

            name: "Medicine Home Delivery",
            basePrice: 40.00,

            durationMin: 30,
            isAvailable: true,

            customFields: {
                technicianRequired: false,
                reportProvided: false,
                equipmentUsed: null,
                homeServiceAvailable: true,
                deliveryRadiusKm: 5
            }
        }
    ];

    const customers = [
        {
            tenantId,

            mobileNumber: "9876543210",
            fullName: "Ramesh Kumar",
            address: "12-45, Gandhi Road, Anantapur",

            customFields: {
                age: 45,
                gender: "Male",
                bloodGroup: "B+",
                allergies: ["Penicillin"],
                chronicConditions: ["Diabetes"]
            }
        },

        {
            tenantId,

            mobileNumber: "9123456789",
            fullName: "Lakshmi Devi",
            address: "8-112, Ram Nagar, Anantapur",

            customFields: {
                age: 38,
                gender: "Female",
                bloodGroup: "O+",
                allergies: [],
                chronicConditions: ["Hypertension"]
            }
        },

        {
            tenantId,

            mobileNumber: "9988776655",
            fullName: "Suresh Babu",
            address: "5-89, Market Street, Anantapur",

            customFields: {
                age: 62,
                gender: "Male",
                bloodGroup: "A+",
                allergies: ["Sulfa Drugs"],
                chronicConditions: ["Diabetes", "Hypertension"]
            }
        },

        {
            tenantId,

            mobileNumber: "9012345678",
            fullName: "Anitha Reddy",
            address: "Near Clock Tower, Anantapur",

            customFields: {
                age: 29,
                gender: "Female",
                bloodGroup: "AB+",
                allergies: [],
                chronicConditions: []
            }
        },

        {
            tenantId,

            mobileNumber: "9345678901",
            fullName: "Prakash Rao",
            address: "Sai Nagar Colony, Anantapur",

            customFields: {
                age: 55,
                gender: "Male",
                bloodGroup: "O-",
                allergies: ["Aspirin"],
                chronicConditions: ["Heart Disease"]
            }
        },

        {
            tenantId,

            mobileNumber: "9765432109",
            fullName: "Kavya Sri",
            address: "Housing Board Colony, Anantapur",

            customFields: {
                age: 23,
                gender: "Female",
                bloodGroup: "B+",
                allergies: [],
                chronicConditions: []
            }
        },

        {
            tenantId,

            mobileNumber: "9556677889",
            fullName: "Narayana Swamy",
            address: "Old Town, Anantapur",

            customFields: {
                age: 71,
                gender: "Male",
                bloodGroup: "A-",
                allergies: ["Ibuprofen"],
                chronicConditions: ["Arthritis"]
            }
        },

        {
            tenantId,

            mobileNumber: "9445566778",
            fullName: "Deepika Sharma",
            address: "RTC Bus Stand Area, Anantapur",

            customFields: {
                age: 34,
                gender: "Female",
                bloodGroup: "O+",
                allergies: [],
                chronicConditions: ["Asthma"]
            }
        },

        {
            tenantId,

            mobileNumber: "9001122334",
            fullName: "Venkatesh Naidu",
            address: "Revenue Colony, Anantapur",

            customFields: {
                age: 49,
                gender: "Male",
                bloodGroup: "B-",
                allergies: [],
                chronicConditions: ["Diabetes"]
            }
        },

        {
            tenantId,

            mobileNumber: "9887766554",
            fullName: "Sravani",
            address: "Ashok Nagar, Anantapur",

            customFields: {
                age: 31,
                gender: "Female",
                bloodGroup: "AB-",
                allergies: ["Dust"],
                chronicConditions: []
            }
        }
    ];

    console.log(data);
}

seeding();

module.exports = prisma;