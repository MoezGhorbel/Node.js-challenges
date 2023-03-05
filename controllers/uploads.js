const uploadFilemiddle = require("../middleware/uploads");
const uploadfile = uploadFilemiddle.uploadFileMiddleware;
const uploadfiles = uploadFilemiddle.uploadFilesMiddleware;

exports.upload = async (req, res) => {
  try {
    await uploadfile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

exports.uploads = async (req, res) => {
  try {
    await uploadfiles(req, res);

    if (req.files.length === 0) {
      return res.status(400).send({ message: "Please upload at least one file!" });
    }
    res.status(200).send({
      message: "Uploaded the files successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while uploading the files.",
      error: err.message,
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (req.file != undefined) {
      res.status(200).send({
        message: "image uploaded successfully"
      });
    } else {
      res.send({
        message: `Could not upload the Image:`,
      });
    }
  } catch (error) {
    res.send({
      message: "error specific",
    });
  }
};