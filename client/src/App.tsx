import { useState, useEffect } from "react";
import Modal from "./components/Modal.tsx";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DBook } from "./api/Book.ts";
import { RootState, AppDispatch } from "./store/Store.ts";
import { useSelector, useDispatch } from "react-redux";
import BookCard from "./components/BookCard.tsx";
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

  async function handlerCreateBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createBook(book));
    setBook({ _id: "", title: "", author: "" });
  }
  async function handlerUpdateBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateBook(updatedBook));
    closeModal();
  }

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-4 gap-5 ">
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
        <form
          onSubmit={handlerCreateBook}
          className="p-4 m-4 md:p-5 bg-white rounded-lg text-left w-72 "
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Create Book
          </h2>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                className=" block  text-sm font-medium text-gray-900"
                htmlFor="img"
              >
                Book image
                <input
                  className="hidden"
                  id="img"
                  name="img"
                  type="file"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const data = await dispatch(uploadImageBook(file));
                      setBook({ ...book, imageUrl: data.payload.url });
                    }
                  }}
                />
                <figure className="relative flex justify-center items-center">
                  <img
                    src={
                      book.imageUrl ??
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV1qiyInwkmtWtFogyKLsvLmEaivie4U3Gg&s"
                    }
                    className="w-28 h-28 rounded-full shadow-lg cursor-pointer"
                    alt="avatar"
                  />
                  <figcaption className="cursor-pointer absolute top-0 w-28 h-28 rounded-full opacity-0 bg-transparent transition-all duration-300 ease-in-out hover:opacity-100 hover:bg-black/50">
                    <img
                      className="w-10 h-10 mx-auto mt-8"
                      alt="camera"
                      src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                    />
                  </figcaption>
                </figure>
              </label>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="bookTitle"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Book title
              </label>
              <input
                className="py-2 px-2 w-full rounded-lg text-black bg-gray-50 border border-gray-300"
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={book.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBook({ ...book, title: e.target.value });
                }}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="bookAuthor"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Book author
              </label>
              <input
                className="py-2 px-2 w-full border border-gray-300 rounded-lg text-black bg-gray-50"
                type="text"
                id="bookAuthor"
                name="bookAuthor"
                value={book.author}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBook({ ...book, author: e.target.value });
                }}
              />
            </div>
          </div>
          <button
            className="px-10 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Create Book"}
          </button>
        </form>
      </div>
      <Modal isOpen={modalStatus} onClose={closeModal}>
        <form
          onSubmit={handlerUpdateBook}
          className="p-4 md:p-5 bg-white rounded-lg text-left"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Update Book
          </h2>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                className=" block  text-sm font-medium text-gray-900"
                htmlFor="updateImg"
              >
                Book image
                <input
                  className="hidden"
                  id="updateImg"
                  name="updateImg"
                  type="file"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const data = await dispatch(uploadImageBook(file));
                      setUpdatedBook({
                        ...updatedBook,
                        imageUrl: data.payload.url,
                      });
                    }
                  }}
                />
                <figure className="relative flex justify-center items-center">
                  <img
                    src={
                      updatedBook.imageUrl ??
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV1qiyInwkmtWtFogyKLsvLmEaivie4U3Gg&s"
                    }
                    className="w-28 h-28 rounded-full shadow-lg cursor-pointer"
                    alt="avatar"
                  />
                  <figcaption className="cursor-pointer absolute top-0 w-28 h-28 rounded-full opacity-0 bg-transparent transition-all duration-300 ease-in-out hover:opacity-100 hover:bg-black/50">
                    <img
                      className="w-10 h-10 mx-auto mt-8"
                      alt="camera"
                      src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                    />
                  </figcaption>
                </figure>
              </label>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="bookTitleUpdate"
                className="block text-sm font-medium text-gray-600 mb-1 text-left"
              >
                Book Title
              </label>
              <input
                className="py-2 px-2 w-full border border-gray-300 rounded-lg text-black bg-gray-50"
                type="text"
                id="bookTitleUpdate"
                name="bookTitleUpdate"
                value={updatedBook?.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUpdatedBook({
                    ...updatedBook,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="bookAuthorUpdate"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Book Author
              </label>
              <input
                className="py-2 px-2 w-full border border-gray-300 rounded-lg text-black bg-gray-50"
                type="text"
                id="bookAuthorUpdate"
                name="bookAuthorUpdate"
                value={updatedBook?.author}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUpdatedBook({
                    ...updatedBook,
                    author: e.target.value,
                  });
                }}
              />
            </div>
            <button
              type="submit"
              className="px-10 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm "
              disabled={loading}
            >
              {loading ? "Uploading..." : "Update Book"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
