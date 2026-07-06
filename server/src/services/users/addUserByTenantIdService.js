const prismaDB = require('../../config/database');

const addUserByTenantIdService = async (tenantId, name, mobileNumber, email, passwordHash, roleId) => {
  const result = await prismaDB.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { tenantId, name, mobileNumber, email, passwordHash },
      select: {
        id: true,
        name: true,
        mobileNumber: true,
        email: true
      }
    });

    await tx.userRole.create({
      data: { userId: user.id, roleId }
    });

    return user;
  });

  return result;
};

module.exports = { addUserByTenantIdService };
