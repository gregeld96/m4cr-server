import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateContentDTO } from 'src/validator/content';
import { generateUUID } from 'src/utils/generate';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const createContentAdmin = async (req: CreateContentDTO & { authorId: string }) => {
    try {
        let slugExist = null;
        let categories : any[] = [];
        let tags : any[] = [];
        let medias : any[] = [];

        const contentId = generateUUID();

        if (req.slug) {
            slugExist = await prisma.content.findFirst({
                where: {
                    slug: {
                        equals: req.slug,
                        mode: 'insensitive',
                    },
                }
            })
        }

        if (slugExist) throw ({ status: 400, message: 'Slug already exist' });

        if (req.tagsId && req.tagsId.length > 0) {
            const listData = req.tagsId.map((x: any) => x.id);

            const tagsExist = await prisma.tag.findMany({
                where: {
                    id: {
                        in: listData,
                    },
                    deletedAt: null,
                },
                select: {
                    id: true
                }
            });

            tags = tagsExist.map((tag : any) => {
                return {
                    tagId: tag.id,
                    contentId,
                }
            });

            if (tagsExist.length !== req.tagsId.length) {
                const missingDataIds = listData.filter((id) => {
                    return !tagsExist.find((tag) => tag.id === id);
                });

                throw {
                    status: 404,
                    message: `Tag with id ${missingDataIds.join(', ')} do not exist`
                };
            }
        }

        if (req.categoriesId && req.categoriesId.length > 0) {
            const listData = req.categoriesId.map((x: any) => x.id);

            const categoriesExist = await prisma.category.findMany({
                where: {
                    id: {
                        in: listData,
                    },
                    deletedAt: null,
                },
                select: {
                    id: true
                }
            });

            categories = categoriesExist.map((category: any) => {
                return {
                    categoryId: category.id,
                    contentId,
                }
            });

            if (categoriesExist.length !== req.categoriesId.length) {
                const missingDataIds = listData.filter((id) => {
                    return !categoriesExist.find((category) => category.id === id);
                });

                throw {
                    status: 404,
                    message: `Category with id ${missingDataIds.join(', ')} do not exist`
                };
            }
        }

        if(req.mediaGalleryId && req.mediaGalleryId.length > 0){
            medias = req.mediaGalleryId?.map((media: any) => {
                return {
                    mediaId: media.id,
                    contentId,
                }
            });
        }

        await prisma.$transaction(async (tx) => {
            await tx.content.create({
                data: {
                    id: contentId,
                    ...omit(req, ['categoriesId', 'mediaGalleryId', 'tagsId', 'slug',]),
                    slug: req.slug?.toLowerCase(),
                }
            });
            
            if(categories.length > 0) {
                await tx.contentCategory.createMany({
                    data: categories,
                })
            }

            if(tags.length) {
                await tx.contentTag.createMany({
                    data: tags,
                })
            }

            if(medias.length) {
                await tx.contentMedia.createMany({
                    data: medias,
                })
            }
        }, {
            maxWait: 1000000, // default: 2000
            timeout: 1000000, // default: 5000
        })
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