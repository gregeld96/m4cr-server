import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreatePanolenseLocationDTO } from 'src/validator/mangrove';

const prisma = new PrismaClient();

export const createMangrovePanolense = async (req: CreatePanolenseLocationDTO & { locationId: number }) => {
    try {
        const data = req.list.map((x) => {
            return {
                ...x,
                locationId: req.locationId,
            }
        });

        await prisma.mangrovePanolense.createMany({
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