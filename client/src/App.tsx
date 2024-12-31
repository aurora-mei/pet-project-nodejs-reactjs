import { useState, useEffect } from "react";
import {
  getBooks,
  createBooks,
  deleteBooks,
  DBook,
  updateBooks,
  getBookById,
} from "./api/Book.ts";
import Modal from "./Modal.tsx";
import { Link } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [books, setBooks] = useState<DBook[]>([]);
  const [book, setBook] = useState<DBook>({ _id: "", title: "", author: "" });
  const [updateBook, setUpdateBook] = useState<DBook>({
    _id: "",
    title: "",
    author: "",
  });

  const [modalStatus, setModalStatus] = useState(false);

  async function openModal(id: string) {
    const book = await getBookById(id);
    console.log("Book fetched:", book);
    setUpdateBook({ _id: book._id, title: book.title, author: book.author });
    setModalStatus(true);
  }
  const closeModal = () => setModalStatus(false);

  useEffect(() => {
    //1.take and set data from backend
    const fetchBooks = async () => {
      const books = await getBooks(); //chuyển thành json
      setBooks(books); //set state
    };
    fetchBooks();
  }, []);
  async function handlerCreateBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newbook = await createBooks(book);
    setBooks([...books, newbook]);
  }
  async function handlerUpdateBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateBooks(updateBook);
    const books = await getBooks(); //chuyển thành json
    setBooks(books);
    closeModal();
  }
  async function handlerDeleteBook(id: string) {
    await deleteBooks(id);
    setBooks(books.filter((book) => book._id !== id));
  }
  return (
    <div className="App">
      <div className="grid grid-cols-4 gap-5 ">
        {books.map((book) => (
          <div
            key={book._id}
            className="p-4 hover:shadow-xl hover:cursor-pointer w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-end items-center gap-x-4 pb-5">
              <button
                type="button"
                title="n"
                className="border border-none"
                onClick={() => openModal(book._id!)}
              >
                <i className="fa-solid fa-pen-to-square" />
              </button>
              <button
                type="button"
                title="n"
                className="border border-none"
                onClick={() => handlerDeleteBook(book._id!)}
              >
                <i className="fa-solid fa-x " />
              </button>
            </div>
            <Modal isOpen={modalStatus} onClose={closeModal}>
              <form
                onSubmit={handlerUpdateBook}
                className="p-5 bg-gray-100 text-black rounded-lg"
              >
                <b>Update Book</b>
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 items-center ">
                  <label htmlFor="bookTitleUpdate">Book title</label>
                  <input
                    className="py-2 border border-gray-200 rounded-lg text-white"
                    type="text"
                    id="bookTitleUpdate"
                    name="bookTitleUpdate"
                    value={updateBook.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUpdateBook({ ...updateBook, title: e.target.value });
                    }}
                  />
                  <label htmlFor="bookAuthorUpdate">Book author</label>
                  <input
                    className="py-2 border border-gray-200 rounded-lg text-white"
                    type="text"
                    id="bookAuthorUpdate"
                    name="bookAuthorUpdate"
                    value={updateBook.author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUpdateBook({ ...updateBook, author: e.target.value });
                    }}
                  />
                </div>
                <button className="px-10 py-2 mt-4 bg-black text-white">
                  Update Book
                </button>
              </form>
            </Modal>
            <div className="flex flex-col items-center ">
              <Link to="/hihi">
                <img
                  alt="avatar"
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV1qiyInwkmtWtFogyKLsvLmEaivie4U3Gg&s"
                />
              </Link>
              <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {book.author}
              </span>
              <p className="text-sm text-justify">
                Bali is predominantly a Hindu country. Bali is known for its
                elaborate, traditional dancing. The dancing is inspired by its
                Hindi beliefs. Most of the dancing portrays tales of good versus
                evil. To watch the dancing is a breathtaking experience. Lombok
                has some impressive points of interest – the majestic Gunung
                Rinjani is an active volcano.
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handlerCreateBook}
        className="flex justify-center items-center gap-10 p-5"
      >
        <label htmlFor="bookTitle">Book title</label>
        <input
          className="py-2 border border-gray-200 rounded-lg text-white"
          type="text"
          id="bookTitle"
          name="bookTitle"
          value={book.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, title: e.target.value });
          }}
        />
        <label htmlFor="bookAuthor">Book author</label>
        <input
          className="py-2 border border-gray-200 rounded-lg text-white"
          type="text"
          id="bookAuthor"
          name="bookAuthor"
          value={book.author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, author: e.target.value });
          }}
        />
        <button className="px-10 py-2 bg-white text-black">Create Book</button>
      </form>
    </div>
  );
}

export default App;
