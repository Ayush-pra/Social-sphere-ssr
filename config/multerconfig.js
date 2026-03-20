const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads');
  },
  filename: function (req, file, cb) {
    try {
      const randomName = crypto.randomBytes(12).toString("hex");
      const fn = randomName + path.extname(file.originalname);
      cb(null, fn);
    } catch (err) {
      cb(err);
    }
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
