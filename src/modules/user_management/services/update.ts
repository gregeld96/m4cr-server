import { PrismaClient } from '@prisma/client';
import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { UpdateAccountDTO } from 'src/validator/user';

const prisma = new PrismaClient();

export const updateAccount = async (payload: UpdateAccountDTO & { id: string}) => {
    const { email, id, firstName, lastName, roleId, statusId, } = payload;

    try {
        const existEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        if (existEmail && (existEmail.id !== id) && (existEmail.email === email)) throw ({ status: 400, message: 'Email already used by another user' });

        // Check selected role exist
        await prisma.role.findFirstOrThrow({
            where: {
                id: roleId,
            }
        });

        // Check selected status exist
        await prisma.status.findFirstOrThrow({
            where: {
                id: statusId,
                category: 'account',
                deletedAt: null,
            }
        });

        await prisma.user.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
                email: email.toLowerCase(),
                roleId: roleId,
                statusId: statusId,
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