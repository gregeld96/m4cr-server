import { Response } from 'express';

export const response = (res: Response, statusCode: number, success: boolean, data: any, message: string) => {
    res.status(statusCode).json({
        code: statusCode,
        success: success,
        message,
        data,
    })
}