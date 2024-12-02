import { Request } from "express";
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';

const generalStorage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        const folder = `./public/${file.fieldname.replace('_', '-')}`;

        if (folder) {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {
                    recursive: true
                });
            }
            cb(null, folder)
        } else {
            cb(null, null)
        }
    },
    filename: function (req, file, cb) {
        if (req) {
            let fieldname = file.fieldname.replace('_', '-');
            let fileArr = file.originalname.split('.');
            let extension = fileArr[fileArr.length - 1];

            cb(null, fieldname + '-' + Date.now() + '.' + extension)
        } else {
            cb(null, '')
        }
    }
})

const uploadImage = multer({
    storage: generalStorage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

function checkFileType(file: any, cb: any) {
    const filetypes = /jpeg|jpg|png|pdf/;
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1]
    const extname = filetypes.test(extension)
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        throw({
            status: 400,
            message: 'Image and PDF Only'
        })
    }
}

export { uploadImage }