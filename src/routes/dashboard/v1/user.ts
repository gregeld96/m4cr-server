import { Router } from "express";
import UserAdminController from "src/modules/user/admin.controller";

const UserRoutes = Router();

// UserRoutes.get('/status/:category', MasterSettingController.statusBasedCategory);
UserRoutes.post('/', UserAdminController.create);
// UserRoutes.put('/:id', MasterSettingController.getRoles);
// UserRoutes.delete('/soft-delete/:id', MasterSettingController.getRoles);

export default UserRoutes;