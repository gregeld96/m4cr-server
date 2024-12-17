
import { GenerateZodType } from "src/utils/generate";
import { z } from "zod";

export const getAnalyticsListFilterSchema =z.object({
    start: GenerateZodType.trimmedStringOptional('start'),
    end: GenerateZodType.trimmedStringOptional('end'),
})
export type GetAnalyticsFilterDTO = z.infer<typeof getAnalyticsListFilterSchema>;