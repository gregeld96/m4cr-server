import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { accountLogin } from "./services/login";
import { sendEmailForgotPassword } from "./services/send_forgot_email";
import { forgotPasswordUpdate } from "./services/forgot_password";


class AuthenticationAdminController {
    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const data = await accountLogin({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success Login');
        } catch(err) {
            next(err)
        }
    }

    static async forgotToken(req: Request, res: Response, next: NextFunction){
        try {
            const data = await sendEmailForgotPassword({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success send email link for forgot password');
        } catch(err) {
            next(err)
        }
    }

    static async forgotPassword(req: Request, res: Response, next: NextFunction){
        try {
            const data = await forgotPasswordUpdate({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update password');
        } catch(err) {
            next(err)
        }
    }
}

export default AuthenticationAdminController;