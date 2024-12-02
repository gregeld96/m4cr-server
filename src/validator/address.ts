import { AddressListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

export const getAddressListFilterSchema =
    generatePaginationSchema({
        sortByEnum: AddressListFilterSort,
        defaultSort: AddressListFilterSort.ID,
    }).extend({
        name: GenerateZodType.trimmedStringOptional('title'),
        referenceId: GenerateZodType.trimmedStringOptional('referenceId'),
    })
export type GetAddressListFilterDTO = z.infer<typeof getAddressListFilterSchema>;