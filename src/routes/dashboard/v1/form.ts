import { Router } from "express";
import FeedbackAdminController from "src/modules/form_feedback/admin.controller";

const FormRoutes = Router();

FormRoutes.get('/', FeedbackAdminController.getAll);
FormRoutes.get('/:id', FeedbackAdminController.getDetail);
FormRoutes.put('/:id', FeedbackAdminController.updateReadStatus);

export default FormRoutes;