import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import UserAdminController from "src/modules/user_management/admin.controller";
import { createInternalAccountSchema, getUserListFilterSchema, updateInternalAccountSchema } from "src/validator/user";

const UserRoutes = Router();

UserRoutes.get('/', validateData(getUserListFilterSchema), UserAdminController.getAll);
UserRoutes.get('/:id', UserAdminController.getDetail);
UserRoutes.post('/', validateData(createInternalAccountSchema), UserAdminController.create);
UserRoutes.put('/deactive/:id', UserAdminController.deactiveAccount);
UserRoutes.put('/:id', validateData(updateInternalAccountSchema), UserAdminController.update);
UserRoutes.delete('/soft-delete/:id', UserAdminController.softDelete);

export default UserRoutes;