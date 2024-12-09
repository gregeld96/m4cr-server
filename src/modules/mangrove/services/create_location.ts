import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const createMangroveLocation = async (req: CreateLocationDTO) => {
    try {
        await prisma.conservationStatus.findFirstOrThrow({
            where: {
                id: Number(req.conservationId),
            }
        });

        await prisma.$transaction(async (tx) => {
            const res = await tx.mangroveLocation.create({
                data: {
                    ...omit(req, ["boundaryType", "geometry", "conservationId", "latitude", "longitude"]),
                    longitude: parseFloat(req.longitude),
                    latitude: parseFloat(req.latitude),
                    conservationId: Number(req.conservationId),
                },
                select: {
                    id: true,
                }
            });

            await tx.mangroveBoundary.create({
                data: {
                    type: req.boundaryType,
                    geometry: JSON.stringify(req.geometry),
                    locationId: res.id,
                }
            });
        }, {
            maxWait: 1000000, // default: 2000
            timeout: 1000000, // default: 5000
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