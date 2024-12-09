import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateBiodiversityLocationDTO } from 'src/validator/mangrove';

const prisma = new PrismaClient();

export const createMangroveBio = async (req: CreateBiodiversityLocationDTO & { locationId: number }) => {
    try {
        const list = req.biodiversities ? req.biodiversities.map((data) => {
            return {
                locationId: req.locationId,
                ...data,
            }
        }) : [];

        await prisma.mangroveBioDiversity.createMany({
            data: list,
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