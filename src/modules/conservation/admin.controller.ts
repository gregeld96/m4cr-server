import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { GetConservationListFilterDTO } from "src/validator/conservation";
import { getConservationList } from "./services/get";
import { getConservationStatusDetail } from "./services/admin_detail";
import { createConservation } from "./services/admin_create";
import { updateConservationStatus } from "./services/admin_update";
import { softDeleteConservationStatus } from "./services/admin_soft";

class ConservationStatusAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetConservationListFilterDTO;

        try {
            const data = await getConservationList({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all conservation status');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getConservationStatusDetail(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail conservation status');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createConservation(req.body);

            response(res, ResStatus.CREATED, true, data, 'Success create conservation status');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            await updateConservationStatus({
                ...req.body,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, null, 'Success update conservation status');
        } catch(err) {
            next(err)
        }
    }

    static async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            await softDeleteConservationStatus(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, null, 'Success delete conservation status');
        } catch(err) {
            next(err)
        }
    }
}

export default ConservationStatusAdminController;