import { GenerateZodType } from "src/utils/generate";
import { z } from "zod";

export const createTagSchema = z.object({
    name: GenerateZodType.trimmedString('name'),
})
export type CreateTagDTO = z.infer<typeof createTagSchema>;
