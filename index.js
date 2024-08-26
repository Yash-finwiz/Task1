const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const cron = require('node-cron')



MONGO_URL = "mongodb://localhost:27017/userAuth";
PORT = 4000;


mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// image upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

  app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  });


  // cron job
  const generateTargetReports = () => {
    console.log('Generating target reports')
    console.log('Target reports generated successfully')
    console.log('Sending target reports to sales executives')
    console.log('Target reports sent successfully')
  }
  
  app.get('/send', (req, res) => {
    console.log('Sending target reports to sales executives')
    res.send('Target reports sent successfully')
  })

  cron.schedule('* * * * *', generateTargetReports)
