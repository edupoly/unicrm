import prismaDB from "../../config/database.js";

const updateUserByUserIdService = async (tenantId, userId, data) => {
  const { name, mobileNumber, email, passwordHash, roleIds } = data;

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
  if (email !== undefined) updateData.email = email;
  if (passwordHash !== undefined) updateData.passwordHash = passwordHash;

  const result = await prismaDB.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId, tenantId },
      data: updateData
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

    const userWithRoles = await tx.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        mobileNumber: true,
        email: true,
        userRoles: {
          select: {
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    return userWithRoles;
  });

  return result;
};

export { updateUserByUserIdService };
