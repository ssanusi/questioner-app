import express from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import restRouter from "./api/restRouter";

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(logger("dev"));

app.use("/api/v1", restRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to REST API for Questioner App" });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`APi Listerning on Port ${port}`);
});

export default app;
