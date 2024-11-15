import { NextFunction, Request, Response } from "express";
import { getStatusBasedCategory } from "./services/status_based_category";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getAccountRoles } from "./services/get_roles";


class MasterSettingController {
    static async statusBasedCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getStatusBasedCategory({
                category: req.params.category,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get data status');
        } catch(err) {
            next(err)
        }
    }

    static async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getAccountRoles();

            response(res, ResStatus.SUCCESS, true, data, 'Success get data account role');
        } catch(err) {
            next(err)
        }
    }
}

export default MasterSettingController;