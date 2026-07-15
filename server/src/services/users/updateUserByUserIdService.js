import prismaDB from "../../config/database.js";

const updateUserByUserIdService = async (tenantId, userId, data) => {
  const { name, mobileNumber, email, passwordHash, roleIds } = data;

  const result = await prismaDB.$transaction(async (tx) => {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
    if (email !== undefined) updateData.email = email;
    if (passwordHash !== undefined) updateData.passwordHash = passwordHash;

    const user = await tx.user.update({
      where: { id: userId, tenantId },
      data: updateData,
      select: {
        id: true,
        name: true,
        mobileNumber: true,
        email: true
      }
    });

    if (roleIds !== undefined) {
      await tx.userRole.deleteMany({
        where: { userId }
      });

      const userRolesData = roleIds.map(roleId => ({ userId, roleId }));

      await tx.userRole.createMany({
        data: userRolesData
      });
    }

    return user;
  });

  return result;
};

export { updateUserByUserIdService };
