import { Router } from "express";
import { uploadImage } from "src/middlewares/upload_image";
import UploadApiController from "src/modules/upload_image/api.controller";

const UploadRoute = Router();

UploadRoute.post('/', uploadImage.any(), UploadApiController.create);

export default UploadRoute;