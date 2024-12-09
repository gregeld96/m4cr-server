import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createBiodiversity } from "./services/admin_create";
import { GetBiodiversityListFilterDTO } from "src/validator/biodiversity";
import { getBiodiversityList } from "./services/get";
import { getBiodiversityDetail } from "./services/admin_detail";
import { softDeleteBiodiversity } from "./services/admin_soft";
import { updateBiodiversity } from "./services/admin_update";

class BiodiversityAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetBiodiversityListFilterDTO;

        try {
            const data = await getBiodiversityList({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getBiodiversityDetail(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createBiodiversity(req.body);

            response(res, ResStatus.CREATED, true, data, 'Success create biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            await updateBiodiversity({
                ...req.body,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, null, 'Success update biodiversity');
        } catch(err) {
            next(err)
        }
    }

    static async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            await softDeleteBiodiversity(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, null, 'Success delete biodiversity');
        } catch(err) {
            next(err)
        }
    }
}

export default BiodiversityAdminController;