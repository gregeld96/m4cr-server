import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import AuthenticationAdminController from "src/modules/authentication/admin.controller";
import { authForgotPasswordSchema, authForgotVerificationSchema, authLoginSchema } from "src/validator/authentication";

const AuthRoutes = Router();

AuthRoutes.post('/login', validateData(authLoginSchema), AuthenticationAdminController.login);
AuthRoutes.post('/verification-password', validateData(authForgotVerificationSchema), AuthenticationAdminController.forgotToken);
AuthRoutes.post('/forgot-password', validateData(authForgotPasswordSchema), AuthenticationAdminController.forgotPassword);


export default AuthRoutes;