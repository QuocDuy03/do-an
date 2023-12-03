const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Thư mục để lưu trữ tệp tin
  },
});

const upload = multer({ storage: storage });

module.exports = upload;