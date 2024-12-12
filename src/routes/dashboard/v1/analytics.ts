import { Router } from "express";
import AnalyticAdminController from "src/modules/analytics/admin.controller";

const AnalyticRoutes = Router();

AnalyticRoutes.get('/', AnalyticAdminController.getAnalytics);

export default AnalyticRoutes;