import { GenerateZodType } from "src/utils/generate";
import { z } from "zod";

export const createInternalAccountSchema = z.object({
    firstName: GenerateZodType.trimmedString('firstName'),
    lastName: GenerateZodType.trimmedString('lastName').nullish(),
    email: GenerateZodType.trimmedString('email'),
    password: GenerateZodType.trimmedString('password'),
    confirmPassword: GenerateZodType.trimmedString('confirmPassword'),
    statusId: GenerateZodType.numberProperty('statusId'),
    roleId: GenerateZodType.trimmedString('roleId'),
})
export type CreateAccountDTO = z.infer<typeof createInternalAccountSchema>;