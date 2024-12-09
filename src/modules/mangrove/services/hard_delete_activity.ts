import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const hardDeleteActivity = async (id: number) => {
    try {
        await prisma.humanActivity.findFirstOrThrow({
            where: {
                id: id,
            }
        });

        await prisma.humanActivityImage.deleteMany({
            where: {
                activityId: id,
            }
        });

        await prisma.humanActivity.delete({
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