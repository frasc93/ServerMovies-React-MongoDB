import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import products from "./routes/Movies";
import dbData from "./db";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/v1/movies", products);

const dbName = "MoviesDB";

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server is running");
  await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
  await dbData();
});


export default app;