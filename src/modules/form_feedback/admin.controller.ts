import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getFormFeedback } from "./services/admin_get_all";
import { GetFeedbackListFilterDTO } from "src/validator/feedback";
import { getAdminFeedbackFormDetail } from "./services/admin_get_detail";
import { updateFormFeedbackReadStatus } from "./services/admin_update";

class FeedbackAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetFeedbackListFilterDTO;

        try {
            const data = await getFormFeedback({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all feedback form');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getAdminFeedbackFormDetail(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail feedback form');
        } catch(err) {
            next(err)
        }
    }

    static async updateReadStatus(req: Request, res: Response, next: NextFunction) {
        try {
            await updateFormFeedbackReadStatus(Number(req.params.id));

            response(res, ResStatus.CREATED, true, null, 'Success update read status feedback form');
        } catch(err) {
            next(err)
        }
    }
}

export default FeedbackAdminController;