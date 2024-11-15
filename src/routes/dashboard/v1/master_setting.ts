import { Router } from "express";
import MasterSettingController from "src/modules/master_setting/admin.controller";

const MasterSettingRoutes = Router();

MasterSettingRoutes.get('/status/:category', MasterSettingController.statusBasedCategory);
MasterSettingRoutes.get('/role', MasterSettingController.getRoles);

export default MasterSettingRoutes;