import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateFollowerContentDTO } from 'src/validator/content';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const updateContentFollower = async (req: CreateFollowerContentDTO & { authorId: string, id: number }) => {
    try {
        let categories : any[] = [];
        let tags : any[] = [];
        let medias : any[] = [];

        const contentExist = await prisma.followerContent.findFirstOrThrow({
            where: {
                id: req.id,
            }
        });

        if(contentExist.authorId !== req.authorId) throw({ status: 401, message: 'Unauthorized user for access the content' });

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
                    contentId: req.id,
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
                    contentId: req.id,
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
                    contentId: req.id,
                }
            });
        }

        await prisma.$transaction(async (tx) => {
            await tx.followerContent.update({
                where: {
                    id: req.id,
                },
                data: {
                    ...omit(req, ['id', 'categoriesId', 'mediaGalleryId', 'tagsId']),
                    updatedAt: new Date(),
                }
            });
            
            if(categories.length > 0) {
                await tx.followerContentCategory.deleteMany({
                    where: {
                        contentId: req.id,
                    }
                });

                await tx.followerContentCategory.createMany({
                    data: categories,
                })
            }

            if(tags.length) {
                await tx.followerContentTag.deleteMany({
                    where: {
                        contentId: req.id,
                    }
                });

                await tx.followerContentTag.createMany({
                    data: tags,
                })
            }

            if(medias.length) {
                await tx.followerContentMedia.deleteMany({
                    where: {
                        contentId: req.id,
                    }
                });

                await tx.followerContentMedia.createMany({
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