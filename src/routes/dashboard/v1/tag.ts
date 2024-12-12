import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import TagAdminController from "src/modules/tag/admin.controller";
import { createTagSchema } from "src/validator/tag";

const TagRoutes = Router();

TagRoutes.get('/', TagAdminController.getAll);
TagRoutes.get('/:id', TagAdminController.getDetail);
TagRoutes.post('/', validateData(createTagSchema), TagAdminController.create);
TagRoutes.put('/:id', validateData(createTagSchema), TagAdminController.update);
TagRoutes.delete('/:id', TagAdminController.softDelete);

export default TagRoutes;