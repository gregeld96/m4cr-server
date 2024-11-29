import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateCategoryDTO } from 'src/validator/category';

const prisma = new PrismaClient();

export const createCategory = async (req: CreateCategoryDTO) => {
    try {
        const exist = await prisma.category.findFirst({
            where: {
                name: {
                    equals: req.name,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        if(exist) throw({ status: 400, message: 'Category already exist'});

        await prisma.category.create({
            data: {
                ...req,
            }
        })
    } catch (error: any) {
        switch (error.name) {
            case ValuesError.ErrorName.PRISMA_NOT_FOUND:
                throw prismaNotFound(error);
            case ValuesError.ErrorName.PRISMA_CLIENT_ERROR:
                throw prismaClientError(error);
            default:
                throw internalServerError(error);
        }
    }
}