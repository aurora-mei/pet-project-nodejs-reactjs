import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DBook,
  getBooks,
  createBooks,
  updateBooks,
  deleteBooks,
} from "../api/Book";
import { uploadImage } from "../api/UploadImage";
//1.import
//2.defince bookstate
//3.defince initialstate
//4.create thunk
//5.define slice
interface BookState {
  books: DBook[];
  selectedBook: DBook | null;
  loading: boolean;
}
const initialState: BookState = {
  books: [],
  selectedBook: null,
  loading: false,
};
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  return await getBooks();
});
export const createBook = createAsyncThunk(
  "books/createBook",
  async (book: DBook) => {
    return await createBooks(book);
  }
);
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (book: DBook) => {
    return await updateBooks(book);
  }
);
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string) => {
    return await deleteBooks(id);
  }
);
export const uploadImageBook = createAsyncThunk(
  "books/uploadImage",
  async (file?: File) => {
    return await uploadImage(file!);
  }
);
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    selectBook(state, action: PayloadAction<DBook>) {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        //do action
        state.books = action.payload; //take response and render
        state.loading = false;
      })
      .addCase(uploadImageBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImageBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (b) => b._id === action.payload._id
        );
        state.books[index] = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      });
  },
});
export const { selectBook } = bookSlice.actions;
export default bookSlice.reducer;
