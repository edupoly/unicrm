import { PrismaClient } from '@prisma/client';

const prismaDB = new PrismaClient();

export default prismaDB;

// const tenantId = 'a7865a05-e67b-4609-970d-aa8393b14204';

// const autoTenantId = 'e9334b5c-d46c-4de6-a801-9f0915a0668e';
// const partnerId = '8d298c69-22f8-4519-a843-c1a7b032d8e3';
// const autoUserId = '9984b8b3-b9f5-40d3-acbc-9d39d704fbd2';

// // staff
// const medicineStaffId = '57b252d6-ef3d-4fef-bdb9-d059b1b2da88';
// const STAFF_ID = 'ccb795ff-21b0-4fc6-b65b-3a993c496182';
// const staffEmail = 'naga@arjuna.com';
// const staffPassword = 'nagarjuna';

// // owner
// const roleId = 'ee51907c-7cb3-4a0c-ad71-e6fe0e4ddba6';
// const userId = '57aa13fc-65ab-4b35-8d4a-a19541dc1e77';
// const email = 'venky@mowa.com';
// const passwordHash = '$2b$10$CL3MvfBjg3Z.dlAxU89V0Oy8EhqyCwFlvPBPraCV7qmV.O1uZFif2';
// const mobileNumber = '9014709040';

// async function seeding() {
//     const allPermissions = await prismaDB.permission.findMany();

//     const customers = [
//         {
//             tenantId,
//             mobileNumber: "9876543210",
//             fullName: "Ravi Kumar",
//             address: "12-45, Gandhi Road, Anantapur, Andhra Pradesh",
//             customFields: {
//                 gender: "Male",
//                 age: 42,
//                 bloodGroup: "B+",
//                 loyaltyTier: "Gold"
//             }
//         },

//         {
//             tenantId,
//             mobileNumber: "9123456789",
//             fullName: "Lakshmi Devi",
//             address: "8-102, Ram Nagar, Anantapur, Andhra Pradesh",
//             customFields: {
//                 gender: "Female",
//                 age: 35,
//                 bloodGroup: "O+",
//                 preferredDoctor: "Dr. Ramesh"
//             }
//         },

//         {
//             tenantId,
//             mobileNumber: "9988776655",
//             fullName: "Suresh Reddy",
//             address: "3-78, Housing Board Colony, Anantapur, Andhra Pradesh",
//             customFields: {
//                 gender: "Male",
//                 age: 58,
//                 bloodGroup: "A+",
//                 chronicConditions: ["Diabetes", "Hypertension"]
//             }
//         }
//     ];

//     const items = {
//         paracetamol: "1aeb4b76-1f8e-4527-8c65-15b964d0466d",
//         thermometer: "3c8f746a-5bab-4d1a-99d7-03fd257ad8f3",
//         bpMonitor: "144a40b4-de27-4d50-9a61-f3646da0f5c7",
//         gloves: "b12c1e98-3a7a-4f58-835a-56e4b7e08551",
//         consultation: "ede904da-ce6b-4c30-83db-31432910373c",
//         bloodTest: "75378c5f-88c4-447f-a6ae-f9a2414d01b4",
//         ecg: "f4eeace1-0f43-4be4-b388-36957b50df12"
//     };

//     const invoices = [
//         {
//             id: '4d1cb071-339e-4563-879f-77708a1722b9',
//             tenantId: 'a7865a05-e67b-4609-970d-aa8393b14204',
//             customerId: '9b37f67f-4979-442d-9417-2abda3e80283',
//             createdBy: '57aa13fc-65ab-4b35-8d4a-a19541dc1e77',
//             invoiceNumber: 'INV-2026-0001',
//             subtotal: 825,
//             taxAmount: 41.25,
//             discountTotal: 25,
//             totalPayable: 841.25,
//             status: 'PAID',
//             createdAt: '2026-06-24T02:45:04.383Z',
//             customFields: { visitType: 'Walk-In', paymentMethod: 'UPI' },
//             items: [
//                 {
//                     id: 'e66b0b4b-865e-4e45-bf02-19cc8a339a4c',
//                     invoiceId: '4d1cb071-339e-4563-879f-77708a1722b9',
//                     itemId: 'ede904da-ce6b-4c30-83db-31432910373c',
//                     quantity: 1,
//                     unitPrice: 500,
//                     totalPrice: 500
//                 },
//                 {
//                     id: 'cd8ef75d-4912-49d6-bc75-46881eef016a',
//                     invoiceId: '4d1cb071-339e-4563-879f-77708a1722b9',
//                     itemId: '1aeb4b76-1f8e-4527-8c65-15b964d0466d',
//                     quantity: 5,
//                     unitPrice: 25,
//                     totalPrice: 125
//                 },
//                 {
//                     id: '0dd15360-8ff2-41af-a007-59559d398209',
//                     invoiceId: '4d1cb071-339e-4563-879f-77708a1722b9',
//                     itemId: '75378c5f-88c4-447f-a6ae-f9a2414d01b4',
//                     quantity: 1,
//                     unitPrice: 200,
//                     totalPrice: 200
//                 }
//             ]
//         },
//         {
//             id: '515c1369-101e-4107-bbae-38051f7088a6',
//             tenantId: 'a7865a05-e67b-4609-970d-aa8393b14204',
//             customerId: 'a44fc63c-1abf-4fcb-adcd-a23082c18996',
//             createdBy: '57aa13fc-65ab-4b35-8d4a-a19541dc1e77',
//             invoiceNumber: 'INV-2026-0003',
//             subtotal: 2100,
//             taxAmount: 105,
//             discountTotal: 50,
//             totalPayable: 2155,
//             status: 'PENDING',
//             createdAt: '2026-06-24T02:45:04.383Z',
//             customFields: { visitType: 'Follow-up', paymentMethod: 'Cash' },
//             items: [
//                 {
//                     id: 'fd4c7230-fd96-4429-b5e9-ac51f9c92388',
//                     invoiceId: '515c1369-101e-4107-bbae-38051f7088a6',
//                     itemId: 'ede904da-ce6b-4c30-83db-31432910373c',
//                     quantity: 1,
//                     unitPrice: 500,
//                     totalPrice: 500
//                 },
//                 {
//                     id: 'c8c8c53e-41ed-4519-beca-c9fe573c5f7d',
//                     invoiceId: '515c1369-101e-4107-bbae-38051f7088a6',
//                     itemId: 'f4eeace1-0f43-4be4-b388-36957b50df12',
//                     quantity: 1,
//                     unitPrice: 800,
//                     totalPrice: 800
//                 },
//                 {
//                     id: '48c59a44-8a11-435f-bbf6-c3649bec7241',
//                     invoiceId: '515c1369-101e-4107-bbae-38051f7088a6',
//                     itemId: 'b12c1e98-3a7a-4f58-835a-56e4b7e08551',
//                     quantity: 2,
//                     unitPrice: 400,
//                     totalPrice: 800
//                 }
//             ]
//         },
//         {
//             id: '74122807-f59f-4de3-bf7f-52e69062f6e2',
//             tenantId: 'a7865a05-e67b-4609-970d-aa8393b14204',
//             customerId: 'c8587c47-450c-4a8f-a123-704c26f85cbd',
//             createdBy: '57aa13fc-65ab-4b35-8d4a-a19541dc1e77',
//             invoiceNumber: 'INV-2026-0002',
//             subtotal: 2599,
//             taxAmount: 129.95,
//             discountTotal: 100,
//             totalPayable: 2628.95,
//             status: 'PAID',
//             createdAt: '2026-06-24T02:45:04.383Z',
//             customFields: { visitType: 'Appointment', paymentMethod: 'Card' },
//             items: [
//                 {
//                     id: 'd4f5b5ee-1251-475a-ae23-1dd23709ba38',
//                     invoiceId: '74122807-f59f-4de3-bf7f-52e69062f6e2',
//                     itemId: 'ede904da-ce6b-4c30-83db-31432910373c',
//                     quantity: 1,
//                     unitPrice: 500,
//                     totalPrice: 500
//                 },
//                 {
//                     id: 'c36b4336-5566-436d-a5a9-d7359aa94d7d',
//                     invoiceId: '74122807-f59f-4de3-bf7f-52e69062f6e2',
//                     itemId: '3c8f746a-5bab-4d1a-99d7-03fd257ad8f3',
//                     quantity: 1,
//                     unitPrice: 299,
//                     totalPrice: 299
//                 },
//                 {
//                     id: '80cafb90-0658-494a-93d5-d9468d637282',
//                     invoiceId: '74122807-f59f-4de3-bf7f-52e69062f6e2',
//                     itemId: '144a40b4-de27-4d50-9a61-f3646da0f5c7',
//                     quantity: 1,
//                     unitPrice: 1800,
//                     totalPrice: 1800
//                 }
//             ]
//         }
//     ];

//     const data = await prismaDB.userRole.create({
//         data: {
//             userId: autoUserId,
//             roleId: partnerId
//         }
//     });

//     console.log(data);
// }
