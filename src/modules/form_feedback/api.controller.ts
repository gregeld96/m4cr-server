import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createFormFeedback } from "./services/create";
import { getFollowerFeedbackForm } from "./services/get_all";
import { getFollowerFeedbackFormDetail } from "./services/get_detail";


class FeedbackApiController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getFollowerFeedbackForm(req.authorized.id);

            response(res, ResStatus.SUCCESS, true, data, 'Success get all feedback form');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getFollowerFeedbackFormDetail(req.authorized.id, Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail feedback form');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createFormFeedback({
                ...req.body,
                followerId: req.authorized.id,
            });

            response(res, ResStatus.CREATED, true, data, 'Success submit feedback form');
        } catch(err) {
            next(err)
        }
    }
}

export default FeedbackApiController;