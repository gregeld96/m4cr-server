import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateActivityLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const createMangroveAcitvity = async (req: CreateActivityLocationDTO & { locationId: number }) => {
    try {
        for (let activity of req.activityList) {
            const data = {
                ...omit(activity, ['imageIds']),
                locationId: req.locationId,
            }

            await prisma.$transaction(async (tx) => {
                const res = await tx.humanActivity.create({
                    data: data,
                });

                const images = activity.imageIds ? activity.imageIds.map((image) => {
                    return {
                        imageId: image.id,
                        activityId: res.id,
                    }
                }) : [];

                await tx.humanActivityImage.createMany({
                    data: images,
                });
            }, {
                maxWait: 1000000, // default: 2000
                timeout: 1000000, // default: 5000
            })
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