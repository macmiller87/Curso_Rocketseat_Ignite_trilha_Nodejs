import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
    tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, File, callback) => {
           const fileHash = crypto.randomBytes(16).toString("hex");
           const fileName = `${fileHash}-${File.originalname}`;

           return callback(null, fileName);
        },
    }),
};