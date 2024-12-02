import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateCategoryDTO } from 'src/validator/category';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateCategory = async (req: CreateCategoryDTO & { id: number }) => {
    try {
        const existName = await prisma.category.findFirst({
            where: {
                name: {
                    equals: req.name,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        await prisma.category.findFirstOrThrow({
            where: {
                id: req.id,
                deletedAt: null,
            },
        });

        if(existName && (existName.id !== req.id)) throw({ status: 400, message: 'Category already exist'});

        await prisma.category.update({
            where: {
                id: req.id,
            },
            data: {
                ...omit(req, ['id']),
                updatedAt: new Date(),

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