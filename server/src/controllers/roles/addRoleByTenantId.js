import { addRoleByTenantIdService } from "../../services/roles/addRoleByTenantIdService.js";

import sendResponse from "../../utils/common/sendResponse.js";

import { checkPermissionExists } from "../../utils/common/checkPermissionExists.js";


const addRoleByTenantId = async (req, res, next) => {
    const { tenantId } = req.user;

    const { roleName, description, permissions } = req.body;

    const allPermissionsExist = permissions.every(p => checkPermissionExists(p));

    if (!allPermissionsExist) {
        return sendResponse(res, 400, false,
            "Provided permissions or a permission doesn't exists"
        );
    }

    const role = await addRoleByTenantIdService(tenantId, roleName, description, permissions);

    return sendResponse(res, 201, true, 'Role created successfully', role);
};

export { addRoleByTenantId };
