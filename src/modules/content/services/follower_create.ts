import { PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { CreateFollowerContentDTO } from 'src/validator/content';
import { omit } from 'src/utils/omit';

const prisma = new PrismaClient();

export const createContentFollower = async (req: CreateFollowerContentDTO & { authorId: string }) => {
    try {
        let categories : any[] = [];
        let tags : any[] = [];
        let medias : any[] = [];

        await prisma.$transaction(async (tx) => {
            const content = await tx.followerContent.create({
                data: {
                    ...omit(req, ['categoriesId', 'mediaGalleryId', 'tagsId']),
                    status: "In Review",
                }
            });

            if (req.tagsId && req.tagsId.length > 0) {
                const listData = req.tagsId.map((x: any) => x.id);
    
                const tagsExist = await tx.tag.findMany({
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
                        contentId: content.id,
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
    
                const categoriesExist = await tx.category.findMany({
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
                        contentId: content.id,
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
                        contentId: content.id,
                    }
                });
            }
            
            if(categories.length > 0) {
                await tx.followerContentCategory.createMany({
                    data: categories,
                })
            }

            if(tags.length) {
                await tx.followerContentTag.createMany({
                    data: tags,
                })
            }

            if(medias.length) {
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