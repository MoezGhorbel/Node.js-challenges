const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        const fileExt = path.extname(file.originalname);
        const fileName = Date.now() + fileExt
        cb(null, fileName);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|gif|png/;
        var mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error(`Error: Only JPEG, JPG, GIF, and PNG files are supported. 
            The file you attempted to upload is of type ${file.mimetype}.`));
        };
    }
}).single("file");

let uploadFiles = multer({
    storage: storage,
    limits: { fileSize: maxSize }
}).array("file");

let uploadFilesMiddleware = util.promisify(uploadFiles);
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = { uploadFileMiddleware, uploadFilesMiddleware };