import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const getContentSeoSlug = async (slug: string) => {
    try {
        const exist = await prisma.content.findFirstOrThrow({
            where: {
                slug,
                deletedAt: null,
            },
            select: {
                id: true,
                title: true,
                excerpt: true,
                seoTitleId: true,
                seoDescId: true,
                seoTitleEn: true,
                seoDescEn: true,
            }
        });

        return {
            detail : exist,
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