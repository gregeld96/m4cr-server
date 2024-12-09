import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import MangroveAdminController from "src/modules/mangrove/admin.controller";
import { getLocationListFilterSchema } from "src/validator/mangrove";

const MangroveRoute = Router();

MangroveRoute.get('/panolense/:id', MangroveAdminController.getPanolense);
MangroveRoute.get('/:id', MangroveAdminController.getDetail);
MangroveRoute.get('/', validateData(getLocationListFilterSchema), MangroveAdminController.getAll);

export default MangroveRoute;