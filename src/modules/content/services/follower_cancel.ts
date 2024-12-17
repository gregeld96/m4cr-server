import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const cancelFollowerContent = async (id: number) => {
    try {
        await prisma.followerContent.findFirstOrThrow({
            where: {
                id,
                deletedAt: null,
                status: 'In Review',
            },
        });

        await prisma.followerContent.update({
            where: {
                id,
            },
            data: {
                status: 'Canceled',
                updatedAt: new Date(),

            }
        })
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