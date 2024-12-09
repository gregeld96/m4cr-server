import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateLocationDTO } from 'src/validator/mangrove';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateMangroveLocation = async (req: CreateLocationDTO & { id: number }) => {
    try {
        await prisma.conservationStatus.findFirstOrThrow({
            where: {
                id: Number(req.conservationId),
            }
        });

        await prisma.$transaction(async (tx) => {
            await tx.mangroveLocation.update({
                where: {
                    id: req.id
                },
                data: {
                    ...omit(req, ["id","boundaryType", "geometry", "conservationId", "latitude", "longitude"]),
                    longitude: parseFloat(req.longitude),
                    latitude: parseFloat(req.latitude),
                    conservationId: Number(req.conservationId),
                },
            });

            await tx.mangroveBoundary.update({
                where: {
                    locationId: req.id,
                },
                data: {
                    type: req.boundaryType,
                    geometry: JSON.stringify(req.geometry),
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