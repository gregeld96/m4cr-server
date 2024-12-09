import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { createSpecies } from "./services/admin_create";
import { getSpeciesDetail } from "./services/admin_detail";
import { updateSpecies } from "./services/admin_update";
import { softDeleteSpecies } from "./services/admin_soft";
import { GetSpeciesListFilterDTO } from "src/validator/species";
import { getSpeciesList } from "./services/get";

class SpeciesAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetSpeciesListFilterDTO;

        try {
            const data = await getSpeciesList({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all species');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getSpeciesDetail(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail species');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createSpecies(req.body);

            response(res, ResStatus.CREATED, true, data, 'Success create species');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            await updateSpecies({
                ...req.body,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, null, 'Success update species');
        } catch(err) {
            next(err)
        }
    }

    static async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            await softDeleteSpecies(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, null, 'Success delete species');
        } catch(err) {
            next(err)
        }
    }
}

export default SpeciesAdminController;