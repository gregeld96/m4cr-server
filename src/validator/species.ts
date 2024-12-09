
import { SpeciesListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

export const createSpeciesSchema = z.object({
    commonName: GenerateZodType.trimmedString('commonName'),
    scientificName: GenerateZodType.trimmedString('scientificName'),
    description: GenerateZodType.trimmedStringOptional('description').nullable(),
    imageId: z.number().nullable(),
})
export type CreateSpeciesDTO = z.infer<typeof createSpeciesSchema>;

export const getSpeciesListFilterSchema =
  generatePaginationSchema({
    sortByEnum: SpeciesListFilterSort,
    defaultSort: SpeciesListFilterSort.CREATED_AT_DESC,
  }).extend({
    name: GenerateZodType.trimmedStringOptional('name'),
  })
export type GetSpeciesListFilterDTO = z.infer<typeof getSpeciesListFilterSchema>;