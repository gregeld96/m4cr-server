import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { generateUUID } from 'src/utils/generate';

const prisma = new PrismaClient();

export const updateFollowerContentAdmin = async (id: number, statusContent: string, authorId: string) => {
    try {
        let createdData: any = null;

        const exist = await prisma.followerContent.findFirstOrThrow({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                thumbnail: true,
                medias: {
                    include: {
                        media: true
                    }
                },
                categories: {
                    include: {
                        category: {
                            include: {

                            }
                        },
                    }
                },
                tags: {
                    include: {
                        tag: true,
                    }
                },
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        });

        if (statusContent.toLowerCase() === 'approved') {
            const contentId = generateUUID();

            const statusSelected = await prisma.status.findFirstOrThrow({
                where: {
                    name: 'draft',
                }
            });

            let categories: any[] = [];
            let tags: any[] = [];
            let medias: any[] = [];

            if (exist.tags && exist.tags.length > 0) {
                tags =  exist.tags.map((tag: any) => {
                    return {
                        tagId: tag.tag.id,
                        contentId,
                    }
                });
            }

            if (exist.categories && exist.categories.length > 0) {
                categories = exist.categories.map((category: any) => {
                    return {
                        categoryId: category.category.id,
                        contentId,
                    }
                });
            }

            if (exist.medias && exist.medias.length > 0) {
                medias = exist.medias?.map((media: any) => {
                    return {
                        mediaId: media.media.id,
                        contentId,
                    }
                });
            }

            if (statusSelected) {
                await prisma.$transaction(async (tx) => {
                    createdData = await tx.content.create({
                        data: {
                            id: contentId,
                            slug: exist.title.toLowerCase().replace(/ /g, '-'),
                            statusId: statusSelected.id,
                            title: exist.title,
                            body: exist.body,
                            bodyHtml: exist.bodyHtml,
                            excerpt: exist.excerpt,
                            link: exist.link,
                            thumbnailId: exist.thumbnailId,
                            type: exist.type,
                            authorId: authorId
                        }
                    });

                    if (categories.length > 0) {
                        await tx.contentCategory.createMany({
                            data: categories,
                        })
                    }

                    if (tags.length) {
                        await tx.contentTag.createMany({
                            data: tags,
                        })
                    }

                    if (medias.length) {
                        await tx.contentMedia.createMany({
                            data: medias,
                        })
                    }
                });
            }
        } else {
            await prisma.followerContent.update({
                where: {
                    id,
                },
                data: {
                    status: 'Rejected',
                    updatedAt: new Date(),
                }
            })
        }

        return {
            detail: createdData,
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