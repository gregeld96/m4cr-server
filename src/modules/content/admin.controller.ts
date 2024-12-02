import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { GetContentListFilterDTO } from "src/validator/content";
import { getAllContentAdmin } from "./services/admin_get_all";
import { getAdminContentDetailId } from "./services/admin_get_id";
import { softDeleteContent } from "./services/admin_soft_delete";
import { updateContentAdmin } from "./services/admin_update";
import { createContentAdmin } from "./services/admin_create";

class ContentAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        const filter = req.query as unknown as GetContentListFilterDTO;

        try {
            const data = await getAllContentAdmin({
                ...filter,
                authorId: req.authorized.id,
                authorRole: req.authorized.roleName,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success get all data');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction){
        try {
            const data = await getAdminContentDetailId(req.params.id);

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail content');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const data = await createContentAdmin({
                ...req.body,
                authorId: req.authorized.id,
            });

            response(res, ResStatus.CREATED, true, data, 'Success create data content');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const data = await updateContentAdmin({
                ...req.body,
                authorId: req.authorized.id,
                id: req.params.id,
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update data content');
        } catch(err) {
            next(err)
        }
    }

    static async softDelete(req: Request, res: Response, next: NextFunction){
        try {
            await softDeleteContent(req.params.id);

            response(res, ResStatus.SUCCESS, true, null, 'Success soft delete data content');
        } catch(err) {
            next(err)
        }
    }
}

export default ContentAdminController;