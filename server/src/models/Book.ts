import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  imageUrl: { type: String },
  title: { type: String },
  author: { type: String },
});
const BookModel = mongoose.model("Book", BookSchema);
export default BookModel;
