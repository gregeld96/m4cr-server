
import { ConservationListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

export const createConservationSchema = z.object({
    name: GenerateZodType.trimmedString('name'),
    type: GenerateZodType.trimmedString('type'),
    description: GenerateZodType.trimmedStringOptional('description').nullable(),
    color: GenerateZodType.trimmedStringOptional('color').nullable(),
})
export type CreateConservationDTO = z.infer<typeof createConservationSchema>;

export const getConservationListFilterSchema =
  generatePaginationSchema({
    sortByEnum: ConservationListFilterSort,
    defaultSort: ConservationListFilterSort.CREATED_AT_DESC,
  }).extend({
    name: GenerateZodType.trimmedStringOptional('name'),
    type: GenerateZodType.trimmedStringOptional('type'),
  })
export type GetConservationListFilterDTO = z.infer<typeof getConservationListFilterSchema>;