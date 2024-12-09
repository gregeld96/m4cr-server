import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { omit } from 'src/utils/omit';
import { CreateBiodiversityDTO } from 'src/validator/biodiversity';

const prisma = new PrismaClient();

export const updateBiodiversity = async (req: CreateBiodiversityDTO & { id: number }) => {
    try {
        await prisma.bioDiversity.findFirstOrThrow({
            where: {
                id: req.id,
                deletedAt: null,
            }
        });

        await prisma.bioDiversity.update({
            where: {
                id: req.id,
            },
            data: {
                ...omit(req, ['id']),
            }
        });
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