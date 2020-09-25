const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 2000000, // 2MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image (png/jpg/jpeg only)'));
    }

    return cb(undefined, true);
  },
});

module.exports = upload;
