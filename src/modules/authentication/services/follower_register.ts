import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { AuthRegisterDTO } from 'src/validator/authentication';
import { generateUUID } from 'src/utils/generate';
import { hashPassword } from 'src/utils/bcrypt';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const followerRegister = async (payload: AuthRegisterDTO) => {
    const { email, password, confirmPassword } = payload;

    try {
        if(password !== confirmPassword) throw({ status: 400, message: 'Password and Confirm Password does not match!'})

        const existEmail = await prisma.follower.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            }
        });

        if (existEmail) throw ({ status: 400, message: 'Email already registered' });

        await prisma.follower.create({
            data: {
                id: generateUUID(),
                ...omit(payload, ['confirmPassword', 'password']),
                password: hashPassword(payload.password),
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