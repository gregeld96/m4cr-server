import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let errorMessage = [];
    
    switch (err.provider) {
        default:
            let message = err.message || 'Internal Server Error';
            errorMessage.push(message);
            statusCode = err.status || statusCode
            break;
    }

    response(res, statusCode, false, null, errorMessage.toString());
}
