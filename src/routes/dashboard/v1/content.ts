import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import ContentAdminController from "src/modules/content/admin.controller";
import { createContentSchema, getContentListFilterSchema } from "src/validator/content";

const ContentRoutes = Router();

ContentRoutes.get('/', validateData(getContentListFilterSchema), ContentAdminController.getAll);
ContentRoutes.post('/', validateData(createContentSchema), ContentAdminController.create);
ContentRoutes.put('/:id', validateData(createContentSchema), ContentAdminController.update);
ContentRoutes.delete('/:id', ContentAdminController.softDelete);


export default ContentRoutes;