import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import CategoryAdminController from "src/modules/category/admin.controller";
import { createCategorySchema } from "src/validator/category";

const CategoryRoutes = Router();

CategoryRoutes.get('/', CategoryAdminController.getAll);
CategoryRoutes.get('/:id', CategoryAdminController.getDetail);
CategoryRoutes.post('/', validateData(createCategorySchema), CategoryAdminController.create);
CategoryRoutes.put('/:id', validateData(createCategorySchema), CategoryAdminController.update);
CategoryRoutes.delete('/:id', CategoryAdminController.softDelete);

export default CategoryRoutes;