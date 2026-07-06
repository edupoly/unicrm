const prismaDB = require('../../config/database');

const addUserByTenantIdService = async (tenantId, name, mobileNumber, email, passwordHash, roleIds) => {
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

    const userRolesData = roleIds.map(roleId => ({ userId: user.id, roleId }));

    await tx.userRole.createMany({
      data: userRolesData
    });

    return user;
  });

  return result;
};

module.exports = { addUserByTenantIdService };
