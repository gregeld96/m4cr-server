import { Router } from "express";
import AuthenticationInternalRoutes from './authentication';
const routes = Router();

routes.use('/auths', AuthenticationInternalRoutes);

export default routes;