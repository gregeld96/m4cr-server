import { Router } from "express";
import ApiVerRoutes from './v1';

const routes = Router();

routes.use('/v1', ApiVerRoutes);


export default routes;