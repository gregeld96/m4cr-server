import { NextFunction, Request, Response } from "express";
import { response } from "src/utils/response";
import ResStatus from 'src/constants/status';
import { forgotPasswordFollower } from "./services/follower_forgot";
import { sendEmailForgotPasswordFollower } from "./services/follower_forgot_email";
import { followerLogin } from "./services/follower_login";
import { followerRegister } from "./services/follower_register";

class AuthenticationApiController {
    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const data = await followerLogin({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success Login');
        } catch(err) {
            next(err)
        }
    }

    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const data = await followerRegister({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success Register');
        } catch(err) {
            next(err)
        }
    }

    static async forgotToken(req: Request, res: Response, next: NextFunction){
        try {
            const data = await sendEmailForgotPasswordFollower({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success send email link for forgot password');
        } catch(err) {
            next(err)
        }
    }

    static async forgotPassword(req: Request, res: Response, next: NextFunction){
        try {
            const data = await forgotPasswordFollower({
                ...req.body
            });

            response(res, ResStatus.SUCCESS, true, data, 'Success update password');
        } catch(err) {
            next(err)
        }
    }
}

export default AuthenticationApiController;