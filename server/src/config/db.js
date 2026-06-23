const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tenantId = 'a7865a05-e67b-4609-970d-aa8393b14204';
const roleId = 'ee51907c-7cb3-4a0c-ad71-e6fe0e4ddba6';
const userId = '83e763cd-4e5a-4b66-986e-49ea957dcce8';
const email = 'venky@mowa.com';
const passwordHash = 'venkymowa';

async function seeding() {
    // const allPermissions = await prisma.permission.findMany();

    const data = await prisma.userRole.create({
        data: {
            userId,
            roleId
        }
    });

    console.log(data);
}

seeding();

module.exports = prisma;