import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getFollowersAnalytics } from "./services/get_top_follower";


class AnalyticAdminController {
    static async getAnalytics(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getFollowersAnalytics();

            response(res, ResStatus.SUCCESS, true, data, 'Success get follower analytics');
        } catch(err) {
            next(err)
        }
    }
}

export default AnalyticAdminController;