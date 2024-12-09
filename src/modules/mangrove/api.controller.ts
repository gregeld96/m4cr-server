import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getMangroveDetail } from "./services/get_detail";
import { getMangroveDetailPanolense } from "./services/get_panolense";
import { getMangroveList } from "./services/get_all";
import { GetLocationListFilterDTO } from "src/validator/mangrove";

class MangroveApiController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetLocationListFilterDTO;

        try {
            const data = await getMangroveList({
                ...filter,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get mangrove location info');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getMangroveDetail(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get mangrove location detail info');
        } catch(err) {
            next(err)
        }
    }

    static async getPanolense(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getMangroveDetailPanolense(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get mangrove panolense detail info');
        } catch(err) {
            next(err)
        }
    }
}

export default MangroveApiController;