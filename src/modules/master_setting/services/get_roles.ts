import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const getAccountRoles = async () => {

    try {
        const request = await prisma.role.findMany({
            where: {
                deletedAt: null,
            },
        });

        const list = request.map((data) => {
            return {
                id: data.id,
                name: data.name,
            }
        })

        return {
            list: list,
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