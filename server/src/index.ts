import dotenv from "dotenv";
dotenv.config(); //config file .env

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  createBooks,
  deleteBooks,
  getBooks,
  updateBooks,
  getBookById,
} from "./controllers/BookController";
const app = express();
const PORT = 3000;

app.use(express.json()); //để nhận value từ req.body
app.use(cors({ origin: "*" })); //để cho phép frontend gọi api từ backend(back end cho phép bất kỳ origin url nào gọi api của nó)
//get all books
app.get("/books", getBooks);
app.get("/books/:bookid", getBookById);
//create a new book
app.post("/books", createBooks);
//delete a book by id
app.delete("/books/:bookid", deleteBooks);
//update a book by id
app.put("/books/:bookid", updateBooks);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to database in ${PORT}`);
  app.listen(PORT);
});
