import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import FeedbackApiController from "src/modules/form_feedback/api.controller";
import { createFeedbackSchema } from "src/validator/feedback";

const FormRoutes = Router();

FormRoutes.get('/', FeedbackApiController.getAll);
FormRoutes.get('/:id', FeedbackApiController.getDetail);
FormRoutes.post('/', validateData(createFeedbackSchema), FeedbackApiController.create);

export default FormRoutes;