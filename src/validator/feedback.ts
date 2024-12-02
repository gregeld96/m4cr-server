import { FeedbackListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

const idProperty = z.object({
    id: z.number(),
});

export const createFeedbackSchema = z.object({
    title: GenerateZodType.trimmedString('title'),
    type: GenerateZodType.trimmedString('type'),
    link: GenerateZodType.trimmedStringOptional('link').nullable(),
    content: GenerateZodType.trimmedStringOptional('content').nullable(),
    province: GenerateZodType.trimmedStringOptional('province').nullable(),
    city: GenerateZodType.trimmedStringOptional('city').nullable(),
    district: GenerateZodType.trimmedStringOptional('district').nullable(),
    urban: GenerateZodType.trimmedStringOptional('urban').nullable(),
    latitute: GenerateZodType.trimmedStringOptional('latitute').nullable(),
    longitute: GenerateZodType.trimmedStringOptional('longitute').nullable(),
    imageIds: z.
        array(
            idProperty,
            {
                message: "gallery is array of object with id properties",
            }
        )
        .nullable(),
})
export type CreateFeedbackDTO = z.infer<typeof createFeedbackSchema>;

export const getFeedbackListFilterSchema =
    generatePaginationSchema({
        sortByEnum: FeedbackListFilterSort,
        defaultSort: FeedbackListFilterSort.CREATED_AT_DESC,
    }).extend({
        title: GenerateZodType.trimmedStringOptional('title'),
        province: GenerateZodType.trimmedStringOptional('province'),
        city: GenerateZodType.trimmedStringOptional('city'),
        district: GenerateZodType.trimmedStringOptional('district'),
        urban: GenerateZodType.trimmedStringOptional('urban'),
    })
export type GetFeedbackListFilterDTO = z.infer<typeof getFeedbackListFilterSchema>;