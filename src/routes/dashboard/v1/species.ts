import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import SpeciesAdminController from "src/modules/species/admin.controller";
import { createSpeciesSchema, getSpeciesListFilterSchema } from "src/validator/species";

const SpeciesRoute = Router();

SpeciesRoute.get('/', validateData(getSpeciesListFilterSchema), SpeciesAdminController.getAll);
SpeciesRoute.get('/:id', SpeciesAdminController.getDetail);
SpeciesRoute.post('/', validateData(createSpeciesSchema), SpeciesAdminController.create);
SpeciesRoute.put('/:id', validateData(createSpeciesSchema), SpeciesAdminController.update);
SpeciesRoute.delete('/:id', SpeciesAdminController.softDelete);

export default SpeciesRoute;