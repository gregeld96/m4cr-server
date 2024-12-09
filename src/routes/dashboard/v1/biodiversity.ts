import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import BiodiversityAdminController from "src/modules/biodiversity/admin.controller";
import { createBiodiversitySchema, getBiodiversityListFilterSchema } from "src/validator/biodiversity";

const BiodiversityRoute = Router();

BiodiversityRoute.get('/', validateData(getBiodiversityListFilterSchema), BiodiversityAdminController.getAll);
BiodiversityRoute.get('/:id', BiodiversityAdminController.getDetail);
BiodiversityRoute.post('/', validateData(createBiodiversitySchema), BiodiversityAdminController.create);
BiodiversityRoute.put('/:id', validateData(createBiodiversitySchema), BiodiversityAdminController.update);
BiodiversityRoute.delete('/:id', BiodiversityAdminController.softDelete);

export default BiodiversityRoute;