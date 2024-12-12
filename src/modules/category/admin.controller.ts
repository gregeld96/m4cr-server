import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { getCategories } from "./services/all";
import { createCategory } from "./services/create";
import { updateCategory } from "./services/update";
import { softDeleteCategory } from "./services/delete";
import { getDetailCategory } from "./services/detail";


class CategoryAdminController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getCategories();

            response(res, ResStatus.SUCCESS, true, data, 'Success get categories');
        } catch(err) {
            next(err)
        }
    }

    static async getDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getDetailCategory(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success get detail category');
        } catch(err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await createCategory(req.body);

            response(res, ResStatus.CREATED, true, data, 'Success create new category');
        } catch(err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await updateCategory({
                ...req.body,
                id: Number(req.params.id),
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update category');
        } catch(err) {
            next(err)
        }
    }

    static async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await softDeleteCategory(Number(req.params.id));

            response(res, ResStatus.SUCCESS, true, data, 'Success soft delete category');
        } catch(err) {
            next(err)
        }
    }
}

export default CategoryAdminController;