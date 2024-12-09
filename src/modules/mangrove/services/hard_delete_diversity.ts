import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const hardDeleteBiodiversity = async (id: number) => {
    try {
        await prisma.mangroveBioDiversity.findFirstOrThrow({
            where: {
                id: id,
            }
        });

        await prisma.mangroveBioDiversity.delete({
            where: {
                id: id,
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