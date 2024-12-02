import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getAllContent } from "./services/api_get_all";
import { GetContentListFilterDTO } from "src/validator/content";
import { getContentDetailSlug } from "./services/api_get_slug";
import { getContentSeoSlug } from "./services/api_get_seo_only";

class ContentApiController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        const filter = req.query as unknown as GetContentListFilterDTO;

        try {
            const data = await getAllContent({
                ...filter,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all data');
        } catch(err) {
            next(err)
        }
    }

    static async getDetailSlug(req: Request, res: Response, next: NextFunction){
        try {
            const data = await getContentDetailSlug(req.params.slug);

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail content');
        } catch(err) {
            next(err)
        }
    }

    static async getDetailSeo(req: Request, res: Response, next: NextFunction){
        try {
            const data = await getContentSeoSlug(req.params.slug);

            response(res, ResStatus.SUCCESS, true, data, 'Success get seo data content');
        } catch(err) {
            next(err)
        }
    }
}

export default ContentApiController;