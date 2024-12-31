import { Request, Response } from "express";
import Book from "../models/Book";
export async function getBooks(req: Request, res: Response) {
  res.json(await Book.find()); //lấy data từ db và trả về cho client
}
export async function createBooks(req: Request, res: Response) {
  const newBook = new Book({
    imageUrl: req.body.imageUrl,
    title: req.body.title,
    author: req.body.author,
  });
  const resBook = await newBook.save();
  res.json(resBook);
}
export async function getBookById(req: Request, res: Response) {
  const book = await Book.findById(req.params.bookid);
  res.json(book);
}
export async function updateBooks(req: Request, res: Response) {
  const updateBook = await Book.findByIdAndUpdate(
    req.params.bookid,
    {
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      author: req.body.author,
    },
    {
      new: true,
    }
  );
  res.json(updateBook);
}
export async function deleteBooks(req: Request, res: Response) {
  const bookid = req.params.bookid;
  const deletedBook = await Book.findByIdAndDelete(bookid);
  res.json(deletedBook); //lấy data từ db và trả về cho client
}
