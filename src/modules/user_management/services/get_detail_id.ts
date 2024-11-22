import { PrismaClient } from '@prisma/client';
import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetSpecificAccountDTO } from 'src/dto/user';

const prisma = new PrismaClient();

export const getAccountDetail = async (req: GetSpecificAccountDTO) => {
    const { id } = req;
    try {
        const data = await prisma.user.findFirstOrThrow({
            where: {
                id,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profilePhoto: {
                    select: {
                        id: true,
                        name: true,
                        locationFile: true,
                        size: true,
                        width: true,
                        height: true,
                    }
                },
                role: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                status: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                createdAt: true,
            },
        });

        return {
            detail: data,
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