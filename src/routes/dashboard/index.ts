import { Router } from "express";
import DashboardInternalVerRoutes from './v1';

const routes = Router();

routes.use('/v1', DashboardInternalVerRoutes);


export default routes;