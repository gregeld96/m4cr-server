import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import BiodiversityApiController from "src/modules/biodiversity/api.controller";
import { getBiodiversityListFilterSchema } from "src/validator/biodiversity";

const BiodiversityRoute = Router();

BiodiversityRoute.get('/', validateData(getBiodiversityListFilterSchema), BiodiversityApiController.getAll);

export default BiodiversityRoute;