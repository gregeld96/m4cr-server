import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { checkPassword } from 'src/utils/bcrypt';
import { generateTokenFollower } from 'src/utils/jwt';
import { AuthLoginDTO } from 'src/validator/authentication';

const prisma = new PrismaClient();

export const followerLogin = async (payload: AuthLoginDTO) => {
    const { email, password } = payload;

    try {
        const existEmail = await prisma.follower.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            }
        });

        if (!existEmail) throw ({ status: 400, message: 'Email or Password incorrect' });

        if (!checkPassword(password, existEmail.password)) throw ({ status: 400, message: 'Email or Password incorrect' });

        const token = generateTokenFollower({
            email: existEmail.email,
            id: existEmail.id,
        });

        return {
            token,
            user: {
                firstName: existEmail.firstName,
                lastName: existEmail.lastName,
                email: existEmail.email,
            }
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