import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createAccount } from "./services/create";

class UserAdminController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            await createAccount(req.body);

            response(res, ResStatus.CREATED, true, null, 'Success create new account');
        } catch(err) {
            next(err);
        }
    } 
}

export default UserAdminController;