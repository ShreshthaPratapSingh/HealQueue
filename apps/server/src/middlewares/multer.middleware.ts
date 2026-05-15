import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const fileFilter: multer.Options["fileFilter"] = (
    req,
    file,
    cb
) =>{
    if (allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(
            new Error("Invalid file type. Only images and pdfs are allowed.")
        )
    }
};

export const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter,
})