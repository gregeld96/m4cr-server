import { NextFunction, Response } from "express";
import { PrismaClient } from '@prisma/client';
import ValuesError from '../constants/values';
import { verifyToken } from "src/utils/jwt";

const prisma = new PrismaClient();

export const authAdmin = async (req: any, res: Response, next: NextFunction) => {
    const header = req.headers?.authorization?.split(' ');

    try {
        if(!header?.[1]) throw({ status: 401, message: 'Kamu tidak memiliki akses!' });

        const decoded : any = verifyToken(header[1]);

        const exist = await prisma.user.findFirst({
            where: {
                email: {
                    equals: decoded.email,
                    mode: 'insensitive',
                },
            },
            include: {
                role: true,
            }
        });

        if(!exist) throw({ status: 401, message: 'User not found!' });

        req.authorized = {
            id: exist.id,
            email: exist.email || '',
            roleId: exist.roleId,
            roleName: exist.role.name,
        };

        next();
    } catch(error : any) {
        if(error?.name === ValuesError.JwtError.EXPIRED_TOKEN){
            next({
                status: 401,
                provider: 'jwt',
                code: error.code,
                message: 'Token expired!'
            });
        } else if(error?.name === ValuesError.JwtError.TOKEN_ERROR){
            next({
                status: 401,
                provider: 'jwt',
                code: error.code,
                message: 'Token error!'
            });
        } 
        
        next(error);
    }
}

export const authFollower = async (req: any, res: Response, next: NextFunction) => {
    const header = req.headers?.authorization?.split(' ');

    try {
        if(!header?.[1]) throw({ status: 401, message: 'Kamu tidak memiliki akses!' });

        const decoded : any = verifyToken(header[1]);

        const exist = await prisma.follower.findFirst({
            where: {
                email: {
                    equals: decoded.email,
                    mode: 'insensitive',
                },
            }
        });

        if(!exist) throw({ status: 401, message: 'User not found!' });

        req.authorized = {
            id: exist.id,
            email: exist.email || '',
            firstName: exist.firstName,
            lastName: exist.lastName,
        };

        next();
    } catch(error : any) {
        if(error?.name === ValuesError.JwtError.EXPIRED_TOKEN){
            next({
                status: 401,
                provider: 'jwt',
                code: error.code,
                message: 'Token expired!'
            });
        } else if(error?.name === ValuesError.JwtError.TOKEN_ERROR){
            next({
                status: 401,
                provider: 'jwt',
                code: error.code,
                message: 'Token error!'
            });
        } 
        
        next(error);
    }
}