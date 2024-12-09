import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateSpeciesDTO } from 'src/validator/species';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateSpecies = async (req: CreateSpeciesDTO & { id: number }) => {
    try {
        await prisma.species.findFirstOrThrow({
            where: {
                id: req.id,
                deletedAt: null,
            }
        });

        await prisma.species.update({
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