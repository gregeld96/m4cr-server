import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateNtfpLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const createMangroveNtfp = async (req: CreateNtfpLocationDTO & { locationId: number }) => {
    try {
        for (let ntfp of req.ntfpList) {
            const data = {
                ...omit(ntfp, ['imageIds']),
                locationId: req.locationId,
            }

            await prisma.$transaction(async (tx) => {
                const res = await tx.nonTimberForestProduct.create({
                    data: data,
                });

                const images = ntfp.imageIds ? ntfp.imageIds.map((image) => {
                    return {
                        imageId: image.id,
                        ntfpId: res.id,
                    }
                }) : [];

                await tx.ntfpImages.createMany({
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