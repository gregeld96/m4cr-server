import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { GetSpeciesListFilterDTO } from "src/validator/species";
import { getSpeciesList } from "./services/get";

class SpeciesApiController {
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
}

export default SpeciesApiController;