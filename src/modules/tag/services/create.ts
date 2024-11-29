import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateTagDTO } from 'src/validator/tag';

const prisma = new PrismaClient();

export const createTag = async (req: CreateTagDTO) => {
    try {
        const exist = await prisma.tag.findFirst({
            where: {
                name: {
                    equals: req.name,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        if(exist) throw({ status: 400, message: 'Tag already exist'});

        await prisma.tag.create({
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