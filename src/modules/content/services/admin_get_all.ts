import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetContentListFilterDTO } from 'src/validator/content';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';
import moment from 'moment';

const prisma = new PrismaClient();

export const getAllContentAdmin = async (filter: GetContentListFilterDTO & { authorId: string, authorRole: string }) => {
    const { authorId, title, tags, categories, sortBy, limit, currentPage, authorRole, createdAt, type, status } = filter;

    try {
        const tagSelected: any = [];
        const categorySelected: any = [];
        const statusSelected = status ? await prisma.status.findFirst({
            where: {
                name: {
                    equals: status,
                    mode: 'insensitive',
                },
                category: 'content',
            }
        }) : null;

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

                if (categoryExist) categorySelected.push(categoryExist.id);
            }
        }

        const whereOptions: Prisma.ContentWhereInput = {
            deletedAt: null,
            title: {
                contains: title,
                mode: 'insensitive',
            },
            type: type ? {
                equals: type ,
                mode: 'insensitive',
            } : undefined,
            statusId : statusSelected ? statusSelected.id : undefined,
            categories: categorySelected.length > 0 ? {
                every: {
                    categoryId: {
                        in: categorySelected,
                    }
                }
            } : undefined,
            tags: tagSelected.length > 0 ? {
                every: {
                    tagId: {
                        in: tagSelected,
                    }
                }
            } : undefined,
            authorId: ['superadmin', 'admin content'].includes(authorRole.toLowerCase()) ? undefined : {
                equals: authorId,
            },
            createdAt: createdAt ? {
                gte: moment(createdAt).format(),
                lte: moment(`${createdAt}T23:59:59`).format()
            } : undefined,
        }

        const totalCount = await prisma.content.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.ContentOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.ContentOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }


        const items = await prisma.content.findMany({
            where: whereOptions,
            orderBy: sortOption,
            include: {
                thumbnail: true,
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
                },
                medias: {
                    select: {
                        media: {
                            select: {
                                id: true,
                                locationFile: true,
                                mimetype: true,
                                name: true,
                                description: true,
                                size: true,
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