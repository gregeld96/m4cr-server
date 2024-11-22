import { AccountListFilterSort } from "src/constants/enum";
import { GenerateZodType } from "src/utils/generate";
import { generatePaginationSchema } from "src/utils/pagination_and_filter";
import { z } from "zod";

export const generalInternalAccountSchema = z.object({
    firstName: GenerateZodType.trimmedString('firstName'),
    lastName: GenerateZodType.trimmedString('lastName').nullish(),
    email: GenerateZodType.trimmedString('email'),
    statusId: GenerateZodType.numberProperty('statusId'),
    roleId: GenerateZodType.trimmedString('roleId'),
})

export const createInternalAccountSchema = generalInternalAccountSchema.extend({
    password: GenerateZodType.trimmedString('password'),
    confirmPassword: GenerateZodType.trimmedString('confirmPassword'),
});

export type CreateAccountDTO = z.infer<typeof createInternalAccountSchema>;

export const updateInternalAccountSchema = generalInternalAccountSchema;

export type UpdateAccountDTO = z.infer<typeof updateInternalAccountSchema>;

export const getUserListFilterSchema =
    generatePaginationSchema({
        sortByEnum: AccountListFilterSort,
        defaultSort: AccountListFilterSort.CREATED_AT_DESC
    }).extend({
        name: GenerateZodType.trimmedStringOptional('name'),
        email: GenerateZodType.trimmedStringOptional('email'),
    })
export type GetUserListFilterDTO = z.infer<typeof getUserListFilterSchema>;