import { NextFunction, Request, Response } from "express";
import { getStatusBasedCategory } from "./services/status_based_category";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getAccountRoles } from "./services/get_roles";
import { GetAddressListFilterDTO } from "src/validator/address";
import { getProvince } from "./services/get_province";
import { getCity } from "./services/get_city";
import { getDistrict } from "./services/get_district";
import { getUrban } from "./services/get_urbans";


class MasterSettingController {
    static async statusBasedCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getStatusBasedCategory({
                category: req.params.category,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get data status');
        } catch(err) {
            next(err)
        }
    }

    static async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getAccountRoles();

            response(res, ResStatus.SUCCESS, true, data, 'Success get data account role');
        } catch(err) {
            next(err)
        }
    }

    static async getProvince(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetAddressListFilterDTO;

        try {
            const data = await getProvince({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get province');
        } catch(err) {
            next(err)
        }
    }

    static async getCity(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetAddressListFilterDTO;

        try {
            const data = await getCity({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get city');
        } catch(err) {
            next(err)
        }
    }

    static async getDistrict(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetAddressListFilterDTO;

        try {
            const data = await getDistrict({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get district');
        } catch(err) {
            next(err)
        }
    }

    static async getUrban(req: Request, res: Response, next: NextFunction) {
        const filter = req.query as unknown as GetAddressListFilterDTO;

        try {
            const data = await getUrban({
                ...filter
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get urban');
        } catch(err) {
            next(err)
        }
    }
}

export default MasterSettingController;