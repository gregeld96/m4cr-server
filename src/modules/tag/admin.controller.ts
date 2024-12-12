import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getTags } from "./services/all";
import { createTag } from "./services/create";
import { updateTag } from "./services/update";
import { softDeleteTag } from "./services/delete";
import { getDetailTag } from "./services/detail";


class TagAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getTags();

            response(res, ResStatus.SUCCESS, true, data, 'Success get tags');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getDetailTag(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail tag');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createTag(req.body);

            response(res, ResStatus.CREATED, true, data, 'Success create new tag');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await updateTag({
                ...req.body,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update tag');
        } catch(err) {
            next(err)
        }
    }

    static async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await softDeleteTag(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success soft delete tag');
        } catch(err) {
            next(err)
        }
    }
}

export default TagAdminController;