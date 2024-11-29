import { Router } from "express";
import { validateData } from "src/middlewares/zod_validation";
import AuthenticationAdminController from "src/modules/authentication/admin.controller";
import AuthenticationApiController from "src/modules/authentication/api.controller";
import { authForgotPasswordSchema, authForgotVerificationSchema, authLoginSchema, authRegisterSchema } from "src/validator/authentication";

const AuthRoutes = Router();

AuthRoutes.post('/login', validateData(authLoginSchema), AuthenticationApiController.login);
AuthRoutes.post('/register', validateData(authRegisterSchema), AuthenticationApiController.register);
AuthRoutes.post('/verification-password', validateData(authForgotVerificationSchema), AuthenticationApiController.forgotToken);
AuthRoutes.post('/forgot-password', validateData(authForgotPasswordSchema), AuthenticationApiController.forgotPassword);


export default AuthRoutes;