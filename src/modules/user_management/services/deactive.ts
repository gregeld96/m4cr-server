import { PrismaClient } from '@prisma/client';
import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetSpecificAccountDTO } from 'src/dto/user';

const prisma = new PrismaClient();

export const deactiveAccountData = async (req: GetSpecificAccountDTO) => {
    try {
        await prisma.user.findFirstOrThrow({
            where: {
                id: req.id,
            },
        });

        const status = await prisma.status.findFirstOrThrow({
            where: {
                name: 'in-active',
                category: 'account',
            }
        })

        await prisma.user.update({
            where: {
                id: req.id,
            },
            data: {
                statusId: status.id,
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