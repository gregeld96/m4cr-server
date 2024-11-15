import { Router } from "express";
// import ApiVerRoutes from './api';
import DashboardVerRoutes from './dashboard';

const routes = Router();

// routes.use('/api', ApiVerRoutes);
routes.use('/dashboard', DashboardVerRoutes);


export default routes;