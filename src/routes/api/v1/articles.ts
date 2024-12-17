import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import ContentApiController from "src/modules/content/api.controller";
import { createFollowerContentSchema, getContentListFilterSchema } from "src/validator/content";

const ArticlesRoutes = Router();

ArticlesRoutes.get('/', validateData(getContentListFilterSchema), ContentApiController.getAllFollowerSubmission);
ArticlesRoutes.get('/:id', ContentApiController.getDetailContentFollower);
ArticlesRoutes.post('/', validateData(createFollowerContentSchema), ContentApiController.create);
ArticlesRoutes.put('/:id', validateData(createFollowerContentSchema), ContentApiController.update);
ArticlesRoutes.delete('/:id', ContentApiController.cancelSubmission);

export default ArticlesRoutes;