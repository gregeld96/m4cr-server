import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateFeedbackDTO } from 'src/validator/feedback';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const createFormFeedback = async (req: CreateFeedbackDTO & { followerId: string }) => {
    try {
        await prisma.$transaction(async (tx) => {
            const feedback = await tx.feedbackForm.create({
                data: {
                    ...omit(req, ['imageIds']),
                },
                select: {
                    id: true,
                }
            })

            const medias = req.imageIds?.map((x) => {
                return {
                    formId: feedback.id,
                    mediaId: x.id,
                }
            });

            if(req.imageIds && req.imageIds.length > 0 && medias){
                await tx.feedbackFormMedia.createMany({
                    data: medias,
                })
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