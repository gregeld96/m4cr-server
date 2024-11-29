import { GenerateZodType } from "src/utils/generate";
import { z } from "zod";

export const createCategorySchema = z.object({
    name: GenerateZodType.trimmedString('name'),
})
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
