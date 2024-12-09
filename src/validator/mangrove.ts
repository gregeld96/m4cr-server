import { MangroveListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

export const createLocationSchema = z.object({
    name: GenerateZodType.trimmedString('name'),
    area: GenerateZodType.trimmedString('area'),
    latitude: GenerateZodType.trimmedString('latitude'),
    longitude: GenerateZodType.trimmedString('longitude'),
    description: GenerateZodType.trimmedStringOptional('description').nullable(),
    province: GenerateZodType.trimmedString('province'),
    city: GenerateZodType.trimmedString('city'),
    district: GenerateZodType.trimmedString('district'),
    urban: GenerateZodType.trimmedString('urban'),
    conservationId: GenerateZodType.trimmedString('conservationId'),
    boundaryType: GenerateZodType.trimmedString('boundaryType'),
    geometry: z.any(),
});

export type CreateLocationDTO = z.infer<typeof createLocationSchema>;

export const speciesMangroveSchema = z.object({
    speciesId: z.number().min(1),
    status: GenerateZodType.trimmedStringOptional('status').nullable(),
    year: z.number().nullable(),
    totalPopulation: z.number().nullable(),
    conservationId: z.number().min(1),
});

export type UpdateSpeciesLocationDTO = z.infer<typeof speciesMangroveSchema>;

export const createSpeciesMangroveSchema = z.object({
    species: z.array(speciesMangroveSchema, {message: 'Invalid species schema'}).min(1)
});

export type CreateSpeciesLocationDTO = z.infer<typeof createSpeciesMangroveSchema>;

export const biodiversityMangroveSchema = z.object({
    bioId: z.number().min(1),
    status: GenerateZodType.trimmedStringOptional('status').nullable(),
    year: z.number().nullable(),
    totalPopulation: z.number().nullable(),
    conservationId: z.number().min(1),
});

export type UpdateBiodiversityLocationDTO = z.infer<typeof biodiversityMangroveSchema>;

export const createBiodiversityMangroveSchema = z.object({
    biodiversities: z.array(biodiversityMangroveSchema, {message: 'Invalid Biodiversity schema'}).min(1)
});

export type CreateBiodiversityLocationDTO = z.infer<typeof createBiodiversityMangroveSchema>;

export const imageActivitySchema = z.object({
    id: z.number().min(1),
});

export const activitySchema = z.object({
    name: GenerateZodType.trimmedString('name'),
    description: GenerateZodType.trimmedStringOptional('description').nullable(),
    imageIds : z.array(imageActivitySchema, {message: 'Invalid image schema'}).nullable(),
});

export type UpdateActivityLocationDTO = z.infer<typeof activitySchema>;

export const activityMangroveSchema = z.object({
    activityList : z.array(activitySchema, {message: 'Invalid activity schema'}).min(1),
});
export type CreateActivityLocationDTO = z.infer<typeof activityMangroveSchema>;

export const ntfpSchema = z.object({
    localName: GenerateZodType.trimmedString('localName'),
    scientificName: GenerateZodType.trimmedString('scientificName'),
    product: GenerateZodType.trimmedString('product'),
    type: GenerateZodType.trimmedStringOptional('type').nullable(),
    commodityType: GenerateZodType.trimmedStringOptional('commodityType').nullable(),
    description: GenerateZodType.trimmedStringOptional('description').nullable(),
    imageIds : z.array(imageActivitySchema, {message: 'Invalid image schema'}).nullable(),
});

export type UpdateNtfpLocationDTO = z.infer<typeof ntfpSchema>;

export const ntfpMangroveSchema = z.object({
    ntfpList : z.array(ntfpSchema, {message: 'Invalid ntfp schema'}).min(1),
});

export type CreateNtfpLocationDTO = z.infer<typeof ntfpMangroveSchema>;

export const panolenseSchema = z.object({
    positionNumber: z.number().min(1),
    positionLink: GenerateZodType.trimmedString('positionLink'),
    imageId : z.number().min(1),
});

export const panolenseMangroveSchema = z.object({
    list : z.array(panolenseSchema, {message: 'Invalid panolense schema'}).min(1),
});

export type CreatePanolenseLocationDTO = z.infer<typeof panolenseMangroveSchema>;

export const getLocationListFilterSchema =
  generatePaginationSchema({
    sortByEnum: MangroveListFilterSort,
    defaultSort: MangroveListFilterSort.CREATED_AT_DESC,
  }).extend({
    name: GenerateZodType.trimmedStringOptional('name'),
    activity: GenerateZodType.trimmedStringOptional('activity'),
    species: GenerateZodType.trimmedStringOptional('species'),
    ntfp: GenerateZodType.trimmedStringOptional('ntfp'),
    province: GenerateZodType.trimmedStringOptional('province'),
    city: GenerateZodType.trimmedStringOptional('city'),
    district: GenerateZodType.trimmedStringOptional('district'),
    urban: GenerateZodType.trimmedStringOptional('urban'),
  })
export type GetLocationListFilterDTO = z.infer<typeof getLocationListFilterSchema>;