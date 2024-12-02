import { Router } from "express";
import { uploadImage } from "src/middlewares/upload_image";
import UploadAdminController from "src/modules/upload_image/admin.controller";

const UploadRoute = Router();

UploadRoute.post('/', uploadImage.any(), UploadAdminController.create);

export default UploadRoute;