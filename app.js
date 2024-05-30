const express = require("express");
const multer = require("multer");

const app = express();
app.use(express.json());

const port = 3000;
console.log(__dirname);
console.log(__filename);

const fileDir = __dirname + "/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// const upload = multer({ dest: "uploads/" });

app.listen(port, () => {
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Hello Page");
});

// key in single should be same as postman key uploading otherwise there will be error
app.post("/upload", upload.single("img"), (req, res) => {
  res.status(200).json({
    message: "File Uploaded",
    fileData: req.file,
  });
});
