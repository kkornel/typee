const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const cloudinaryUpload = async (folder, public_id, dataUri) => {
  return await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id,
  });
};

const cloudinaryDelete = async (folder, publicId) => {
  return await cloudinary.uploader.destroy(`${folder}/${publicId}`);
};

module.exports = {
  cloudinaryUpload,
  cloudinaryDelete,
};
