require('dotenv').config();

import bcrypt from 'bcryptjs';

export const hashPassword = (inputPassword: string) => {
    var salt = bcrypt.genSaltSync(Number(process.env.SALT_KEY));
    return bcrypt.hashSync(inputPassword, salt);
}

export const checkPassword = (inputPassword: string, hashingPassword: string) => {
    return bcrypt.compareSync(inputPassword, hashingPassword)    
}