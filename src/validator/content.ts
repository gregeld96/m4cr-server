import { ContentListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

const idProperty = z.object({
    id: z.number(),
});

export const createContentSchema = z.object({
    title: GenerateZodType.trimmedString('title'),
    type: GenerateZodType.trimmedString('type'),
    slug: GenerateZodType.trimmedStringOptional('slug').nullable(),
    excerpt: GenerateZodType.trimmedStringOptional('excerpt').nullable(),
    body: GenerateZodType.trimmedStringOptional('body').nullable(),
    bodyHtml: GenerateZodType.trimmedStringOptional('bodyHtml').nullable(),
    thumbnailId: z.number().nullable(),
    link: GenerateZodType.trimmedStringOptional('link').nullable(),
    statusId: z.number(),
    seoTitleId: GenerateZodType.trimmedStringOptional('seoTitleId').nullable(),
    seoDescId: GenerateZodType.trimmedStringOptional('seoDescId').nullable(),
    seoTitleEn: GenerateZodType.trimmedStringOptional('seoTitleEn').nullable(),
    seoDescEn: GenerateZodType.trimmedStringOptional('seoDescEn').nullable(),
    categoriesId: z.
        array(
            idProperty,
            {
                message: "categories is array of object with id properties",
            }
        )
        .nullable(),
    tagsId: z.
        array(
            idProperty,
            {
                message: "tags is array of object with id properties",
            }
        )
        .nullable(),
    mediaGalleryId: z.
        array(
            idProperty,
            {
                message: "gallery is array of object with id properties",
            }
        )
        .nullable(),
})
export type CreateContentDTO = z.infer<typeof createContentSchema>;

export const getContentListFilterSchema =
  generatePaginationSchema({
    sortByEnum: ContentListFilterSort,
    defaultSort: ContentListFilterSort.CREATED_AT_DESC,
  }).extend({
    title: GenerateZodType.trimmedStringOptional('title'),
    type: GenerateZodType.trimmedStringOptional('type'),
    categories: GenerateZodType.trimmedStringOptional('categories'),
    tags: GenerateZodType.trimmedStringOptional('tags'),
    createdAt: GenerateZodType.trimmedStringOptional('createdAt'),
    status: GenerateZodType.trimmedStringOptional('status'),
  })
export type GetContentListFilterDTO = z.infer<typeof getContentListFilterSchema>;