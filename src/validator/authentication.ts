
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

export const authRegisterSchema = z.object({
    firstName: GenerateZodType.trimmedString('firstName'),
    lastName: GenerateZodType.trimmedStringOptional('lastName').nullable(),
    email: GenerateZodType.trimmedString('email'),
    phone: GenerateZodType.trimmedStringOptional('phone').nullable(),
    gender: GenerateZodType.trimmedString('gender'),
    password: GenerateZodType.trimmedString('password'),
    confirmPassword: GenerateZodType.trimmedString('confirmPassword'),
    socialMedia: GenerateZodType.trimmedStringOptional('socialMedia').nullable(),
    socialLink: GenerateZodType.trimmedStringOptional('socialLink').nullable(),
    reference: GenerateZodType.trimmedStringOptional('reference').nullable(),
    subscribeNews: GenerateZodType.boolean('subscribeNews'),
})
export type AuthRegisterDTO = z.infer<typeof authRegisterSchema>;