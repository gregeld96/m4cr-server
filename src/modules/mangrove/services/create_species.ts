import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateSpeciesLocationDTO } from 'src/validator/mangrove';

const prisma = new PrismaClient();

export const createMangroveSpecies = async (req: CreateSpeciesLocationDTO & { locationId: number }) => {
    try {
        const data = req.species ? req.species.map((species) => {
            return {
                locationId: req.locationId,
                ...species,
            }
        }) : [];

        await prisma.mangroveSpecies.createMany({
            data: data,
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