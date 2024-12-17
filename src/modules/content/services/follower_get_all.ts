import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetContentListFilterDTO } from 'src/validator/content';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';

const prisma = new PrismaClient();

export const getAllContentFollowerSubmission = async (filter: GetContentListFilterDTO & { authorId: string }) => {
    const { title, tags, categories, sortBy, limit, currentPage, createdAt, status, type, authorId } = filter;

    try {
        const tagSelected: any = [];
        const categorySelected: any = [];

        if (tags && tags.split(',').length > 0) {
            const tagList = tags.split(',');

            for (let tag of tagList) {
                const tagExist = await prisma.tag.findFirst({
                    where: {
                        name: {
                            equals: tag,
                            mode: 'insensitive',
                        }
                    }
                });

                if (tagExist) tagSelected.push(tagExist.id);
            }
        }

        if (categories && categories.split(',').length > 0) {
            const categoryList = categories.split(',');

            for (let category of categoryList) {
                const categoryExist = await prisma.category.findFirst({
                    where: {
                        name: {
                            equals: category,
                            mode: 'insensitive',
                        }
                    }
                });

                if (categoryExist) tagSelected.push(categoryExist.id);
            }
        }

        const whereOptions: Prisma.FollowerContentWhereInput = {
            deletedAt: null,
            title: {
                contains: title,
                mode: 'insensitive',
            },
            status: status ? status : undefined,
            type: {
                equals: type ? type : 'content',
                mode: 'insensitive',
            },
            categories: categorySelected.length > 0 ? {
                every: {
                    id: {
                        in: categorySelected,
                    }
                }
            } : undefined,
            tags: tagSelected.length > 0 ? {
                every: {
                    id: {
                        in: tagSelected,
                    }
                }
            } : undefined,
            createdAt: createdAt ? new Date(createdAt) : undefined,
            authorId: authorId,
        }

        const totalCount = await prisma.followerContent.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.FollowerContentOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.FollowerContentOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }


        const items = await prisma.followerContent.findMany({
            where: whereOptions,
            orderBy: sortOption,
            include: {
                thumbnail: true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                tags: {
                    select: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
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