import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetFeedbackListFilterDTO } from 'src/validator/feedback';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';

const prisma = new PrismaClient();

export const getFormFeedback = async (filter: GetFeedbackListFilterDTO) => {
    const { title, province, urban, city, district, currentPage, sortBy, limit, } = filter;

    try {
        const whereOptions: Prisma.FeedbackFormWhereInput = {
            title: {
                contains: title,
                mode: 'insensitive',
            },
            province: province ? {
                equals: province,
                mode: 'insensitive'
            } : undefined,
            city: city ? {
                equals: city,
                mode: 'insensitive'
            } : undefined,
            district: district ? {
                equals: district,
                mode: 'insensitive'
            } : undefined,
            urban: urban ? {
                equals: urban,
                mode: 'insensitive'
            } : undefined,
        }

        const totalCount = await prisma.feedbackForm.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.FeedbackFormOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.FeedbackFormOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.feedbackForm.findMany({
            where: whereOptions,
            orderBy: sortOption,
            include: {
                follower: true,
                images: {
                    include: {
                        media: true,
                    }
                }
            },
            skip,
            take,
        });

        return {
            totalCount,
            totalPage,
            list: items,
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