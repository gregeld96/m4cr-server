import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createAccount } from "./services/create";
import { getAccountData } from "./services/get_all";
import { GetUserListFilterDTO } from "src/validator/user";
import { getAccountDetail } from "./services/get_detail_id";
import { updateAccount } from "./services/update";
import { softDeleteAccountData } from "./services/delete";
import { deactiveAccountData } from "./services/deactive";

class UserAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetUserListFilterDTO;
        
        try {
            const data = await getAccountData({
                ...filter,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get account data');
        } catch(err) {
            next(err);
        }
    } 

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getAccountDetail({
                id: req.params.id,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get account detail');
        } catch(err) {
            next(err);
        }
    } 

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            await createAccount(req.body);

            response(res, ResStatus.CREATED, true, null, 'Success create new account');
        } catch(err) {
            next(err);
        }
    } 

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            await updateAccount({
                ...req.body,
                id: req.params.id,
            });

            response(res, ResStatus.SUCCESS, true, null, 'Success update account');
        } catch(err) {
            next(err);
        }
    }

    static async deactiveAccount(req: Request, res: Response, next: NextFunction) {
        try {
            await deactiveAccountData({ id: req.params.id});

            response(res, ResStatus.SUCCESS, true, null, 'Success deactive account');
        } catch(err) {
            next(err);
        }
    } 
    
    static async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            await softDeleteAccountData(req.params.id);

            response(res, ResStatus.SUCCESS, true, null, 'Success soft delete account');
        } catch(err) {
            next(err);
        }
    } 
}

export default UserAdminController;