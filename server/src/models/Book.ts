import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
});
const BookModel = mongoose.model("Book", BookSchema);
export default BookModel;
