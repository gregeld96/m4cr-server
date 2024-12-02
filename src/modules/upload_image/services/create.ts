import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const createMediaFile = async (req: any) => {
    try {
        const data = await prisma.mediaFile.create({
            data: {
                name: req[0].filename,
                description: req[0].originalname,
                category: req[0].fieldname,
                mimetype: req[0].mimetype,
                locationFile: req[0].path,
                size: req[0].size.toString(),
            }
        });

        return {
            detail: data
        };
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