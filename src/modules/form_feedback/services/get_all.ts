import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const getFollowerFeedbackForm = async (followerId: string) => {
    try {
        const list = await prisma.feedbackForm.findMany({
            where: {
                followerId,
            },
        });

        return {
            list: list,
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