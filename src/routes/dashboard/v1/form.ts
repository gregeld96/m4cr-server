import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import FeedbackAdminController from "src/modules/form_feedback/admin.controller";
import { getFeedbackListFilterSchema } from "src/validator/feedback";

const FormRoutes = Router();

FormRoutes.get('/', validateData(getFeedbackListFilterSchema), FeedbackAdminController.getAll);
FormRoutes.get('/:id', FeedbackAdminController.getDetail);
FormRoutes.put('/:id', FeedbackAdminController.updateReadStatus);

export default FormRoutes;