import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import MasterSettingController from "src/modules/master_setting/admin.controller";
import { getAddressListFilterSchema } from "src/validator/address";

const MasterSettingRoutes = Router();

MasterSettingRoutes.get('/status/:category', MasterSettingController.statusBasedCategory);
MasterSettingRoutes.get('/province', validateData(getAddressListFilterSchema), MasterSettingController.getProvince);
MasterSettingRoutes.get('/city', validateData(getAddressListFilterSchema), MasterSettingController.getCity);
MasterSettingRoutes.get('/district', validateData(getAddressListFilterSchema), MasterSettingController.getDistrict);
MasterSettingRoutes.get('/urban', validateData(getAddressListFilterSchema), MasterSettingController.getUrban);

export default MasterSettingRoutes;