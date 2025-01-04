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
  selectBook,
  createBook,
  updateBook,
  fetchBooks,
  deleteBook,
  uploadImageBook,
} from "./store/BookSlice.ts";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, selectedBook } = useSelector(
    (state: RootState) => state.bookReducer
  );

  const [activeModalKey, setActiveModalKey] = useState("");

  // Hàm mở modal
  const openModal = (key: string, udbook: DBook) => {
    dispatch(selectBook(udbook));
    setActiveModalKey(key);
  };

  const closeModal = () => setActiveModalKey("");
  //function
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  async function handleFileUpload(file: File): Promise<string> {
    const data = await dispatch(uploadImageBook(file));
    return data.payload.url;
  }
  function handleCreateBook(book: DBook) {
    dispatch(createBook(book));
    closeModal();
  }
  function handleUpdateBook(updatedBook: DBook) {
    dispatch(updateBook(updatedBook));
    closeModal();
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
            onEdit={() => openModal("update-modal", book)}
            onDelete={() => dispatch(deleteBook(book._id!))}
          ></BookCard>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="my-4 px-10 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm"
          onClick={() =>
            openModal("create-modal", {
              _id: "",
              title: "",
              author: "",
              imageUrl: "",
            })
          }
        >
          Create book
        </button>
        {activeModalKey === "create-modal" && (
          <Modal key="create-modal" isOpen={true} onClose={closeModal}>
            <FormBook
              key="create-form"
              bookData={{ _id: "", title: "", author: "", imageUrl: "" }}
              onSubmit={(book) => {
                handleCreateBook(book);
              }}
              loading={loading}
              onFileUpload={handleFileUpload}
            />
          </Modal>
        )}
      </div>
      {activeModalKey === "update-modal" && (
        <Modal
          key={selectedBook?._id || "edit-modal"}
          isOpen={true}
          onClose={closeModal}
        >
          <FormBook
            key={selectedBook?._id || "edit-form"}
            bookData={selectedBook!}
            onSubmit={(updatedBook) => {
              handleUpdateBook(updatedBook);
            }}
            loading={loading}
            onFileUpload={handleFileUpload}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
