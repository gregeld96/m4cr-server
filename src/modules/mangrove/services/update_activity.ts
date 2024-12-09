import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { UpdateActivityLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateMangroveActivity = async (req: UpdateActivityLocationDTO & { id: number }) => {
    try {
        await prisma.humanActivity.findFirstOrThrow({
            where: {
                id: req.id,
            }
        });

        await prisma.humanActivityImage.deleteMany({
            where: {
                activityId: req.id,
            },
        });

        if(req.imageIds && req.imageIds.length){
            const data = req.imageIds.map((image) => {
                return {
                    activityId: req.id,
                    imageId: image.id,
                }
            });

            await prisma.humanActivityImage.createMany({
                data: data,
            });
        }

        await prisma.humanActivity.update({
            where: {
                id: req.id,
            },
            data: {
                ...omit(req, ['id', 'imageIds']),
                updatedAt: new Date(),
            },
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