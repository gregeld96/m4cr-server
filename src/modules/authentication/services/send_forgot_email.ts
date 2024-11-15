import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { generateTokenForgot } from 'src/utils/jwt';
import { AuthForgotVerificationDTO } from 'src/validator/authentication';
import { forgotPasswordTemplate } from 'src/modules/third_party/email/template/forgot_password';
import { sendGeneralEmail } from 'src/modules/third_party/email/service/send_general';

const prisma = new PrismaClient();

export const sendEmailForgotPassword = async (payload: AuthForgotVerificationDTO) => {
    const { email } = payload;

    try {
        const exist = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            }
        });

        if (!exist) throw ({ status: 400, message: 'Email not found' });

        let token = generateTokenForgot({
            email: exist.email
        });

        const htmlTemplate = await forgotPasswordTemplate({
            url: `${process.env.WEBSITE_URL_FORGOT_PASSWORD}/${token}`,
            email,
        });

        await sendGeneralEmail(
            email,
            'Forgot Password M4CR',
            htmlTemplate,
        );
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