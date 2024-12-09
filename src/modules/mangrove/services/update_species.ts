import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { UpdateSpeciesLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateMangroveSpecies = async (req: UpdateSpeciesLocationDTO & { id: number }) => {
    try {
        await prisma.mangroveSpecies.findFirstOrThrow({
            where: {
                id: req.id,
            }
        });

        await prisma.mangroveSpecies.update({
            where: {
                id: req.id,
            },
            data: {
                ...omit(req, ['id']),
                updatedAt: new Date(),
            },
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