const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/uploads");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

function fileFilter(req,file,cb) {
  const fileextension = path.extname(file.originalname);
  const acceptedExtension = [".png",".jpg",".jpeg"];
  cb(null, acceptedExtension.includes(fileextension));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post("/", upload.single("file"),controller.uploadImage);
router.post("/multiple", upload.array("file",3),controller.uploadImage);

module.exports = router;