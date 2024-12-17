import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import moment from 'moment';

const prisma = new PrismaClient();

export const getFollowersAnalytics = async (startDate: string, endDate: string) => {

    try {
        const start = moment(startDate ? startDate : moment().format("YYYY-MM-DD")).subtract(7, 'hours').format();
        const end = moment(endDate ? endDate : moment().add(7, 'days').format("YYYY-MM-DD")).subtract(7, 'hours').format();

        const topFollowerJoined = await prisma.follower.findMany({
            where: {
                deletedAt: null,
                createdAt: {
                    gte: start,
                    lte: end,
                }
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
                createdAt: {
                    gte: start,
                    lte: end,
                }
            },
        });

        const totalFollowerMale = await prisma.follower.count({
            where: {
                deletedAt: null,
                gender: 'male',
                createdAt: {
                    gte: start,
                    lte: end,
                }
            },
        });

        const totalFollowerUpload = await prisma.follower.findMany({
            where: {
                deletedAt: null,
                contents: {
                    every: {
                        createdAt: {
                            gte: start,
                            lte: end,
                        }
                    }
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                _count: {
                    select: {
                        contents: true, // Count of comments related to each content
                    },
                },
            },
            orderBy: {
                contents: {
                    _count: 'desc', // Order by the number of comments in descending order
                },
            },
        });

        const totalFollowerUploadArrange = totalFollowerUpload.map((data) => {
            return {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                count: data._count.contents,
            }
        })

        const totalFollowerFemale = await prisma.follower.count({
            where: {
                deletedAt: null,
                gender: 'female',
                createdAt: {
                    gte: start,
                    lte: end,
                }
            },
        });

        const totalContent = await prisma.content.count({
            where: {
                deletedAt: null,
                createdAt: {
                    gte: start,
                    lte: end,
                }
            },
        });

        const hotTopics = await prisma.content.findMany({
            where: {
                deletedAt: null,
                createdAt: {
                    gte: start,
                    lte: end,
                }
            },
            select: {
                id: true,
                title: true, // Get the content title
                _count: {
                    select: {
                        count: true, // Count of comments related to each content
                    },
                },
            },
            orderBy: {
                count: {
                    _count: 'desc', // Order by the number of comments in descending order
                },
            },
        });

        const hotTopicsCount = hotTopics.map((data) => {
            return {
                id: data.id,
                title: data.title,
                count: data._count.count,
            }
        })

        return {
            topFollowerJoined,
            totalFollower,
            totalFollowerMale,
            totalFollowerFemale,
            totalContent,
            topFollowerUpload: totalFollowerUploadArrange,
            hotTopics: hotTopicsCount,
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