import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import AnalyticAdminController from "src/modules/analytics/admin.controller";
import { getAnalyticsListFilterSchema } from "src/validator/analytics";

const AnalyticRoutes = Router();

AnalyticRoutes.get('/', validateData(getAnalyticsListFilterSchema), AnalyticAdminController.getAnalytics);

export default AnalyticRoutes;