import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getAllContent } from "./services/api_get_all";
import { GetContentListFilterDTO } from "src/validator/content";
import { getContentDetailSlug } from "./services/api_get_slug";
import { getContentSeoSlug } from "./services/api_get_seo_only";
import { createContentFollower } from "./services/follower_create";
import { updateContentFollower } from "./services/follower_update";
import { cancelFollowerContent } from "./services/follower_cancel";
import { getFollowerContentDetailId } from "./services/follower_get_detail";
import { getAllContentFollowerSubmission } from "./services/follower_get_all";

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

    static async getAllFollowerSubmission(req: Request, res: Response, next: NextFunction){
        const filter = req.query as unknown as GetContentListFilterDTO;

        try {
            const data = await getAllContentFollowerSubmission({
                ...filter,
                authorId: req.authorized.id,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all data');
        } catch(err) {
            next(err)
        }
    }

    static async getDetailContentFollower(req: Request, res: Response, next: NextFunction){
        try {
            const data = await getFollowerContentDetailId(Number(req.params.id), req.authorized.id);

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail content');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const data = await createContentFollower({
                ...req.body,
                authorId: req.authorized.id,
            });

            response(res, ResStatus.CREATED, true, data, 'Success submit content');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const data = await updateContentFollower({
                ...req.body,
                authorId: req.authorized.id,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update content');
        } catch(err) {
            next(err)
        }
    }

    static async cancelSubmission(req: Request, res: Response, next: NextFunction){
        try {
            await cancelFollowerContent(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, null, 'Success cancel content submission');
        } catch(err) {
            next(err)
        }
    }
}

export default ContentApiController;