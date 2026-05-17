import { getCloudinary } from "../config/cloudinary.js";

export const uploadToCloudinary = (
    fileBuffer: Buffer
) => {
    return new Promise((resolve, reject) => {
        getCloudinary().uploader.upload_stream({}, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        }).end(fileBuffer);
    })
}