import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { omit } from 'src/utils/omit';
import { CreateTagDTO } from 'src/validator/tag';

const prisma = new PrismaClient();

export const updateTag = async (req: CreateTagDTO & { id: number }) => {
    try {
        const existName = await prisma.tag.findFirst({
            where: {
                name: {
                    equals: req.name,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        await prisma.tag.findFirstOrThrow({
            where: {
                id: req.id,
                deletedAt: null,
            },
        });

        if(existName && (existName.id !== req.id)) throw({ status: 400, message: 'Tag already exist'});

        await prisma.tag.update({
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