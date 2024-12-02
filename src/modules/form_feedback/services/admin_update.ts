import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateFeedbackDTO } from 'src/validator/feedback';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateFormFeedbackReadStatus = async (id: number) => {
    try {
        await prisma.feedbackForm.findFirstOrThrow({
            where: {
                id,
            },
        });

        await prisma.feedbackForm.update({
            where: {
                id,
            },
            data: {
                isRead: true,
                updatedAt: new Date(),
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