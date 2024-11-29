import { Router } from 'express';
import ApiVerRoutes from './api';
import DashboardVerRoutes from './dashboard';
import SocialRoutes from './social';

const routes = Router();

routes.use(
	'/api', 
	ApiVerRoutes
);
routes.use(
	'/dashboard',
	DashboardVerRoutes
);

routes.use('/social', SocialRoutes);

export default routes;
