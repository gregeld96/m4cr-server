import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateBiodiversityDTO } from 'src/validator/biodiversity';

const prisma = new PrismaClient();

export const createBiodiversity = async (req: CreateBiodiversityDTO) => {
    try {
        const data = await prisma.bioDiversity.create({
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