const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

const loginRouter = require("./routes/LoginRouter");
const UserRouter = require("./routes/UserRouter");
const ProjectRouter = require("./routes/ProjectRouter");
const ActualDetailRouter = require("./routes/ActualDetailRouter");


dotenv.config();

const app = express();

// Middleware สำหรับตรวจสอบความถูกต้องของ API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["api-key"]; // รับค่า API key จาก header

  if (!apiKey || apiKey !== "f7d1e7d8a794d925d2bfe5a13b25a6a4") {
    return res.status(401).json({ message: "Invalid API key" });
  }

  next(); // ให้ middleware ถัดไปดำเนินการต่อ
};

app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(express.static(path.join(__dirname, "uplaods")));

app.get("/", validateApiKey, (req, res) => {
  res.send("Hello World!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/login", loginRouter);
app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);
app.use("/api/actual-details", ActualDetailRouter);


app.listen(process.env.PORT, () => {
  console.log(
    `Server is Running at http://localhost:${process.env.PORT}/api-docs`
  );
});
