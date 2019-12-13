// const multer = require('multer');
// const cloudinary = require('../config/cloudinary');
// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, `${name + Date.now()}.${extension}`);
//   },
// });
// console.log("image");
// module.exports = multer({ cloudinary }).single('image');

const cloudinary = require('../config/cloudinary');

module.exports = cloudinary;
