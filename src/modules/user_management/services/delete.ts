import { PrismaClient } from '@prisma/client';
import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const softDeleteAccountData = async (id: string) => {
    try {
        const exist = await prisma.user.findFirstOrThrow({
            where: {
                id,
            },
        });

        if(exist && exist.deletedAt) throw({ status: 400, message: 'User already soft deleted'});

        await prisma.user.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
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