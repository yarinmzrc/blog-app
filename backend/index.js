import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDb();
});

app.use(authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
