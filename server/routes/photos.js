const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
});

const s3 = new aws.S3();

// upload.single('fileName') as middleware
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "elasticbeanstalk-us-west-2-286442757590/images",
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
  }),
});

module.exports = upload;
