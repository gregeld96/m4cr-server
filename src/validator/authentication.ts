
import { GenerateZodType } from "src/utils/generate";
import { z } from "zod";

export const authLoginSchema = z.object({
    email: GenerateZodType.trimmedString('email'),
    password: GenerateZodType.trimmedString('password'),
})
export type AuthLoginDTO = z.infer<typeof authLoginSchema>;

export const authForgotVerificationSchema = z.object({
    email: GenerateZodType.trimmedString('email'),
})
export type AuthForgotVerificationDTO = z.infer<typeof authForgotVerificationSchema>;

export const authForgotPasswordSchema = z.object({
    token: GenerateZodType.trimmedString('token'),
    password: GenerateZodType.trimmedString('password'),
    confirmPassword: GenerateZodType.trimmedString('confirmPassword'),
})
export type AuthForgotPasswordDTO = z.infer<typeof authForgotPasswordSchema>;