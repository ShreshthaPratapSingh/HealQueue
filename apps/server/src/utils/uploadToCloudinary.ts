import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (
    fileBuffer: Buffer
) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(error);
            }
        }).end(fileBuffer);
    })
}