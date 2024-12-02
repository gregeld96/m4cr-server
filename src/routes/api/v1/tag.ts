import { Router } from "express";
import TagAdminController from "src/modules/tag/admin.controller";

const TagRoutes = Router();

TagRoutes.get('/', TagAdminController.getAll);

export default TagRoutes;