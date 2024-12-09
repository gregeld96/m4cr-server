import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { UpdateActivityLocationDTO, UpdateNtfpLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateMangroveNtfp = async (req: UpdateNtfpLocationDTO & { id: number }) => {
    console.log(req);
    try {
        await prisma.nonTimberForestProduct.findFirstOrThrow({
            where: {
                id: req.id,
            }
        });

        await prisma.ntfpImages.deleteMany({
            where: {
                ntfpId: req.id,
            },
        });

        if(req.imageIds && req.imageIds.length){

            const data = req.imageIds.map((image) => {
                return {
                    ntfpId: req.id,
                    imageId: image.id,
                }
            });

            console.log(data);

            await prisma.ntfpImages.createMany({
                data: data,
            });
        }

        await prisma.nonTimberForestProduct.update({
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