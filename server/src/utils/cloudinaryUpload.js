import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadImage = (file, folder = "rent-sathi") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

export default uploadImage;