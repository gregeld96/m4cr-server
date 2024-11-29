import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { verifyTokenForgot } from 'src/utils/jwt';
import { AuthForgotPasswordDTO } from 'src/validator/authentication';
import { hashPassword } from 'src/utils/bcrypt';

const prisma = new PrismaClient();

export const forgotPasswordFollower = async (payload: AuthForgotPasswordDTO) => {
    const { token, password, confirmPassword } = payload;

    try {
        if(password !== confirmPassword) throw ({ status: 400, message: 'Password and Confirm Password not the same' });

        const decoded : any = verifyTokenForgot(token);

        const exist = await prisma.follower.findFirst({
            where: {
                email: {
                    equals: decoded.email,
                    mode: 'insensitive',
                }
            }
        });

        if(!exist) throw ({ status: 400, message: 'Email not found!' });

        await prisma.follower.update({
            where: {
                id: exist.id,
            },
            data: {
                password: hashPassword(password),
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