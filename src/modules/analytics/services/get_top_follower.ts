import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';

const prisma = new PrismaClient();

export const getFollowersAnalytics = async () => {

    try {
        const topFollowerJoined = await prisma.follower.findMany({
            where: {
                deletedAt: null,
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                subscribeNews: true,
                createdAt: true,
                socialLink: true,
                socialMedia: true,
                reference: true,
                phone: true,
                gender: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
        });

        const totalFollower = await prisma.follower.count({
            where: {
                deletedAt: null,
            },
        });

        const totalFollowerMale = await prisma.follower.count({
            where: {
                deletedAt: null,
                gender: 'male'
            },
        });

        const totalFollowerFemale = await prisma.follower.count({
            where: {
                deletedAt: null,
                gender: 'female'
            },
        });

        return {
            topFollowerJoined,
            totalFollower,
            totalFollowerMale,
            totalFollowerFemale,
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