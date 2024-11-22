import { PrismaClient } from '@prisma/client';
import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { hashPassword } from 'src/utils/bcrypt';
import { generateUUID } from 'src/utils/generate';
import { CreateAccountDTO } from 'src/validator/user';

const prisma = new PrismaClient();

export const createAccount = async (payload: CreateAccountDTO) => {
    const { email, password, confirmPassword, firstName, lastName, roleId, statusId, } = payload;

    try {
        if(password !== confirmPassword) throw ({ status: 400, message: 'Password and Confirm Password not the same' });

        const existEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        if (existEmail) throw ({ status: 400, message: 'Email already registered' });

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

        await prisma.user.create({
            data: {
                id: generateUUID(),
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: hashPassword(password),
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