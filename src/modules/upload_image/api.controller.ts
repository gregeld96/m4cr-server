import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createMediaFile } from "./services/create";

class UploadApiController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            let data = null;

            if(req.files){
                data = await createMediaFile(req.files);
    
            }
            
            response(res, ResStatus.CREATED, true, data, 'Success upload media');
        } catch(err) {
            next(err)
        }
    }
}

export default UploadApiController;