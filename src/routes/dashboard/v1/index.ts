import { Router } from "express";
import AuthenticationInternalRoutes from './authentication';
import MasterSettingInternalRoutes from './master_setting';
import UserInternalRoutes from './user'
import { authAdmin } from "src/middlewares/authentication";
const routes = Router();

routes.use('/auths', AuthenticationInternalRoutes);
routes.use(authAdmin)
routes.use('/master-settings', MasterSettingInternalRoutes);
routes.use('/users', UserInternalRoutes)

export default routes;