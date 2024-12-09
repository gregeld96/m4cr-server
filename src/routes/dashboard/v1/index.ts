import { Router } from "express";
import AuthenticationInternalRoutes from './authentication';
import MasterSettingInternalRoutes from './master_setting';
import UserInternalRoutes from './user';
import CategoryRoutes from './category';
import TagRoutes from './tag';
import ContentRoutes from './content';
import UploadRoutes from './upload';
import FormRoutes from './form';
import SpeciesRoutes from './species';
import BiodiversityRoutes from './biodiversity';
import ConservationRoutes from './conservation';
import MangroveRoutes from './mangrove';

import { authAdmin } from "src/middlewares/authentication";
const routes = Router();

routes.use('/auths', AuthenticationInternalRoutes);
routes.use(authAdmin)
routes.use('/master-settings', MasterSettingInternalRoutes);
routes.use('/users', UserInternalRoutes);
routes.use('/categories', CategoryRoutes);
routes.use('/tags', TagRoutes);
routes.use('/contents', ContentRoutes);
routes.use('/uploads', UploadRoutes);
routes.use('/forms', FormRoutes);
routes.use('/biodiversities', BiodiversityRoutes);
routes.use('/specieses', SpeciesRoutes);
routes.use('/conservations', ConservationRoutes);
routes.use('/mangroves', MangroveRoutes);

export default routes;