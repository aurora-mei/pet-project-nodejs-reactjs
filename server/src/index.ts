import dotenv from "dotenv";
dotenv.config(); //config file .env

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "./models/Book";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(express.json()); //để nhận value từ req.body
app.use(cors({ origin: "http://localhost:5173" })); //để cho phép frontend gọi api từ backend(back end cho phép bất kỳ origin url nào gọi api của nó)
app.get("/books", async (req: Request, res: Response) => {
  res.json(await Book.find()); //lấy data từ db và trả về cho client
});
app.post("/books", async (req: Request, res: Response) => {
  const newBook = new Book({
    title: req.body.title,
  });
  const resBook = await newBook.save();
  res.json(resBook);
});
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to database in ${PORT}`);
  app.listen(PORT);
});
