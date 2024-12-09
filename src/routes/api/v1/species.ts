import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import SpeciesApiController from "src/modules/species/api.controller";
import { getSpeciesListFilterSchema } from "src/validator/species";

const SpeciesRoute = Router();

SpeciesRoute.get('/', validateData(getSpeciesListFilterSchema), SpeciesApiController.getAll);

export default SpeciesRoute;