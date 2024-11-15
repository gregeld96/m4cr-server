import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import UserAdminController from "src/modules/user/admin.controller";
import { createInternalAccountSchema } from "src/validator/user";

const UserRoutes = Router();

// UserRoutes.get('/status/:category', MasterSettingController.statusBasedCategory);
UserRoutes.post('/', validateData(createInternalAccountSchema), UserAdminController.create);
// UserRoutes.put('/:id', MasterSettingController.getRoles);
// UserRoutes.delete('/soft-delete/:id', MasterSettingController.getRoles);

export default UserRoutes;