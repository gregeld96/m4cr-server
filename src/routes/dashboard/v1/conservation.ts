import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import ConservationStatusAdminController from "src/modules/conservation/admin.controller";
import { createConservationSchema, getConservationListFilterSchema } from "src/validator/conservation";

const ConservationRoutes = Router();

ConservationRoutes.get('/', validateData(getConservationListFilterSchema), ConservationStatusAdminController.getAll);
ConservationRoutes.get('/:id', ConservationStatusAdminController.getDetail);
ConservationRoutes.post('/', validateData(createConservationSchema), ConservationStatusAdminController.create);
ConservationRoutes.put('/:id', validateData(createConservationSchema), ConservationStatusAdminController.update);
ConservationRoutes.delete('/:id', ConservationStatusAdminController.softDelete);

export default ConservationRoutes;