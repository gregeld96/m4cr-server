import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;
const JWT_KEY_FOLLOWER = process.env.JWT_KEY_FOLLOWER;
const JWT_KEY_FORGOT = process.env.JWT_KEY_FORGOT

function generateToken (payload: any){
    return jwt.sign(payload, JWT_KEY || '', {
        expiresIn: '24h',
    });
}

function generateTokenForgot (payload: any){
    return jwt.sign(payload, JWT_KEY_FORGOT || '', {
        expiresIn: '1h'
    });
}

function generateTokenFollower (payload: any){
    return jwt.sign(payload, JWT_KEY_FOLLOWER || '', {
        expiresIn: '24h',
    });
}

function verifyToken (token: string){
    return jwt.verify(token, JWT_KEY || '');
}

function verifyTokenForgot (token: string){
    return jwt.verify(token, JWT_KEY_FORGOT || '');
}

export {
    generateToken,
    generateTokenForgot,
    generateTokenFollower,
    verifyToken,
    verifyTokenForgot,
};