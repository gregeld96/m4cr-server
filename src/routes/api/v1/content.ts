import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import ContentApiController from "src/modules/content/api.controller";
import { getContentListFilterSchema } from "src/validator/content";

const ContentRoutes = Router();

ContentRoutes.get('/', validateData(getContentListFilterSchema), ContentApiController.getAll);
ContentRoutes.get('/seo/:slug', ContentApiController.getDetailSeo);
ContentRoutes.get('/:slug', ContentApiController.getDetailSlug);


export default ContentRoutes;