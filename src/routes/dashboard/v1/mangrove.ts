import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import MangroveAdminController from "src/modules/mangrove/admin.controller";
import { activityMangroveSchema, activitySchema, biodiversityMangroveSchema, createBiodiversityMangroveSchema, createLocationSchema, createSpeciesMangroveSchema, getLocationListFilterSchema, ntfpMangroveSchema, ntfpSchema, panolenseMangroveSchema, speciesMangroveSchema } from "src/validator/mangrove";

const MangroveRoute = Router();

MangroveRoute.get('/panolense/:id', MangroveAdminController.getPanolense);
MangroveRoute.get('/:id', MangroveAdminController.getDetail);
MangroveRoute.get('/', validateData(getLocationListFilterSchema), MangroveAdminController.getAll);
MangroveRoute.post('/', validateData(createLocationSchema), MangroveAdminController.createLocation);
MangroveRoute.post('/species/:id', validateData(createSpeciesMangroveSchema), MangroveAdminController.createSpecies);
MangroveRoute.post('/biodiversity/:id', validateData(createBiodiversityMangroveSchema), MangroveAdminController.createBiodiversity);
MangroveRoute.post('/activity/:id', validateData(activityMangroveSchema), MangroveAdminController.createActivity);
MangroveRoute.post('/ntfp/:id', validateData(ntfpMangroveSchema), MangroveAdminController.createNtfp);
MangroveRoute.post('/panolense/:id', validateData(panolenseMangroveSchema), MangroveAdminController.createPanolense);
// Update
MangroveRoute.put('/:id', validateData(createLocationSchema), MangroveAdminController.updateLocation);
MangroveRoute.put('/species/:speciesMangroveId', validateData(speciesMangroveSchema), MangroveAdminController.updateSpecies);
MangroveRoute.put('/biodiversity/:bioMangroveId', validateData(biodiversityMangroveSchema), MangroveAdminController.updateBiodiversity);
MangroveRoute.put('/activity/:activityId', validateData(activitySchema), MangroveAdminController.updateActivity);
MangroveRoute.put('/ntfp/:ntfpId', validateData(ntfpSchema), MangroveAdminController.updateNtfp);
// Delete
MangroveRoute.delete('/:id', MangroveAdminController.softDeleteLocation);
MangroveRoute.delete('/species/:speciesMangroveId', MangroveAdminController.hardDeleteSpecies);
MangroveRoute.delete('/biodiversity/:bioMangroveId', MangroveAdminController.hardDeleteBio);
MangroveRoute.delete('/activity/:activityId', MangroveAdminController.hardDeleteActivity);
MangroveRoute.delete('/ntfp/:ntfpId', MangroveAdminController.hardDeleteNtfp);
MangroveRoute.delete('/panolense/:panolenseId', MangroveAdminController.hardDeletePanolense);

export default MangroveRoute;