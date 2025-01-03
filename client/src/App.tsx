import { useState, useEffect } from "react";
import Modal from "./components/Modal.tsx";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DBook } from "./api/Book.ts";
import { RootState, AppDispatch } from "./store/Store.ts";
import { useSelector, useDispatch } from "react-redux";
import BookCard from "./components/BookCard.tsx";
import FormBook from "./components/BookForm.tsx";
import NavbarLogin from "./components/Navbar.tsx";
import {
  createBook,
  updateBook,
  fetchBooks,
  deleteBook,
  uploadImageBook,
} from "./store/BookSlice.ts";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading } = useSelector(
    (state: RootState) => state.bookReducer
  );
  const [book, setBook] = useState<DBook>({
    _id: "",
    imageUrl: "",
    title: "",
    author: "",
  });
  const [updatedBook, setUpdatedBook] = useState<DBook>({
    _id: "",
    imageUrl: "",
    title: "",
    author: "",
  });
  const [modalStatus, setModalStatus] = useState(false);

  //modal
  async function openModal(udbook: DBook) {
    console.log("Book fetched:", udbook);
    setUpdatedBook(udbook);
    console.log("updatedBook:", updatedBook);
    setModalStatus(true);
  }
  const closeModal = () => setModalStatus(false);
  //function
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  async function handleFileUpload(file: File): Promise<string> {
    const data = await dispatch(uploadImageBook(file));
    return data.payload.url;
  }

  return (
    <div className="App">
      <NavbarLogin />
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-4 gap-5 mt-16">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onEdit={() => openModal(book)}
            onDelete={() => dispatch(deleteBook(book._id!))}
          ></BookCard>
        ))}
      </div>
      <div className="flex justify-center items-center">
        {/* <button
          type="button"
          className="my-4 px-10 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm"
          onClick={() => setModalStatus(true)}
        > */}
        {/* Create book
        </button> */}
        <FormBook
          key="create-form"
          bookData={{ _id: "", title: "", author: "", imageUrl: "" }}
          onSubmit={(book) => {
            console.log("create book:", book);
            dispatch(createBook(book));
          }}
          loading={loading}
          onFileUpload={handleFileUpload}
        />
      </div>
      <Modal isOpen={modalStatus} onClose={closeModal}>
        <FormBook
          key={updatedBook._id || "edit-form"}
          bookData={updatedBook}
          onSubmit={(updatedBook) => {
            console.log("update book:", updatedBook);
            dispatch(updateBook(updatedBook));
            closeModal();
          }}
          loading={loading}
          onFileUpload={handleFileUpload}
        />
      </Modal>
    </div>
  );
}

export default App;
