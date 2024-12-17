import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getFollowersAnalytics } from "./services/get_top_follower";
import { GetAnalyticsFilterDTO } from "src/validator/analytics";


class AnalyticAdminController {
    static async getAnalytics(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetAnalyticsFilterDTO;

        try {
            const data = await getFollowersAnalytics(filter.start || '', filter.end || '');

            response(res, ResStatus.SUCCESS, true, data, 'Success get follower analytics');
        } catch(err) {
            next(err)
        }
    }
}

export default AnalyticAdminController;