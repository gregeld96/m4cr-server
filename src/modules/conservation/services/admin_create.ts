import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateConservationDTO } from 'src/validator/conservation';

const prisma = new PrismaClient();

export const createConservation = async (req: CreateConservationDTO) => {
    try {
        const data = await prisma.conservationStatus.create({
            data: {
                ...req,
            }
        });

        return {
            detail: data,
        }
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