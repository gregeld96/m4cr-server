import { Router } from "express";
import AuthenticationInternalRoutes from './authentication';
import ContentRoutes from './content';
import CategoryRoutes from './category';
import TagsRoutes from './tag';
import UploadRoutes from './upload';
import FormRoutes from './form';
import MasterSettingRoutes from "./master_setting";
import SpeciesRoutes from "./species";
import BiodiversityRoutes from "./biodiversity";
import MangroveRoutes from "./mangrove";

import { authFollower } from "src/middlewares/authentication";

const routes = Router();

routes.use('/auths', AuthenticationInternalRoutes);
routes.use('/contents', ContentRoutes);
routes.use('/categories', CategoryRoutes);
routes.use('/tags', TagsRoutes);
routes.use('/master-settings', MasterSettingRoutes);
routes.use('/specieses', SpeciesRoutes);
routes.use('/biodiversities', BiodiversityRoutes);
routes.use('/mangroves', MangroveRoutes);

routes.use(authFollower);
routes.use('/uploads', UploadRoutes);
routes.use('/forms', FormRoutes);


export default routes;