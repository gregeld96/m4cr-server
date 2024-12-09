
import { BiodiversityListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

export const createBiodiversitySchema = z.object({
    commonName: GenerateZodType.trimmedString('commonName'),
    scientificName: GenerateZodType.trimmedString('scientificName'),
    type: GenerateZodType.trimmedString('type'),
    description: GenerateZodType.trimmedStringOptional('description').nullable(),
    imageId: z.number().nullable(),
})
export type CreateBiodiversityDTO = z.infer<typeof createBiodiversitySchema>;

export const getBiodiversityListFilterSchema =
  generatePaginationSchema({
    sortByEnum: BiodiversityListFilterSort,
    defaultSort: BiodiversityListFilterSort.CREATED_AT_DESC,
  }).extend({
    name: GenerateZodType.trimmedStringOptional('name'),
  })
export type GetBiodiversityListFilterDTO = z.infer<typeof getBiodiversityListFilterSchema>;