const cloudinary = require("cloudinary").v2;

const { fileToBase64 } = require("./utils");

cloudinary.config(process.env.CLOUDINARY_URL);
/**
 * @param file - file to upload
 * @param folder - folder where the image will be stored
 */
const cloudinaryImageUpload = async (file, folder) => {
  const imageBase64 = fileToBase64(file.mimetype, file.data); //use tempdir to avoid using node fs
  const { secure_url } = await cloudinary.uploader.upload(imageBase64, {
    folder: `${folder}`,
  });
  return secure_url;
};

module.exports = {
  cloudinaryImageUpload,
};
