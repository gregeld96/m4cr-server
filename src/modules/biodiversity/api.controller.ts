import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { GetBiodiversityListFilterDTO } from "src/validator/biodiversity";
import { getBiodiversityList } from "./services/get";

class BiodiversityApiController {
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
}

export default BiodiversityApiController;