import { Router } from "express";
import CategoryAdminController from "src/modules/category/admin.controller";

const CategoryRoutes = Router();

CategoryRoutes.get('/', CategoryAdminController.getAll);

export default CategoryRoutes;