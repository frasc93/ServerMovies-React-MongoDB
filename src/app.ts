import express, { NextFunction, Response, Request } from "express";
export const app = express();
import mongoose from "mongoose";

import products from "./routes/products";

app.use(express.json());

app.use("/v1/products", products);

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server is running");
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`);
});

export default app;
