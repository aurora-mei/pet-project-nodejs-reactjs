import { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
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
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<DBook[]>([]);
  const [book, setBook] = useState<DBook>({
    _id: "",
    imageUrl: "",
    title: "",
    author: "",
  });
  const [updateBook, setUpdateBook] = useState<DBook>({
    _id: "",
    imageUrl: "",
    title: "",
    author: "",
  });
  const [modalStatus, setModalStatus] = useState(false);

  // Configure Cloudinary
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dfoq1dvce", // Thay bằng cloud name của bạn
    },
  });
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset1");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfoq1dvce/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    return await res.json();
  };

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
    setBook({ _id: "", title: "", author: "" });
  }
  async function handlerUpdateBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateBooks(updateBook);
    console.log("Book after", updateBook);
    const books = await getBooks();
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
                className="p-4 md:p-5 bg-white rounded-lg text-left"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                  Update Book
                </h2>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 "
                      htmlFor="updateBookImg"
                    >
                      Book image
                    </label>
                    <input
                      title="updateBookImg"
                      className="py-2 px-2 w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      id="updateBookImg"
                      name="updateBookImg"
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setLoading(true);
                          const data = await uploadImage(file);
                          setUpdateBook({ ...updateBook, imageUrl: data.url });
                          setLoading(false);
                        }
                      }}
                    />
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
                      value={updateBook.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUpdateBook({ ...updateBook, title: e.target.value });
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
                      value={updateBook.author}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUpdateBook({
                          ...updateBook,
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
                    {loading ? "Updating..." : "Update Book"}
                  </button>
                </div>
              </form>
            </Modal>
            <div className="flex flex-col items-center ">
              <Link to="/hihi">
                <img
                  alt="avatar"
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={
                    book.imageUrl ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV1qiyInwkmtWtFogyKLsvLmEaivie4U3Gg&s"
                  }
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
      <div className="flex justify-center items-center">
        <form
          onSubmit={handlerCreateBook}
          className="p-4 m-4 md:p-5 bg-white rounded-lg text-left w-fit "
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Create Book
          </h2>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                htmlFor="bookImg"
              >
                Book image
              </label>
              <input
                title="bookImg"
                className="py-2 px-2 w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                type="file"
                accept=".jpg, .jpeg, .png"
                id="bookImg"
                name="bookImg"
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLoading(true);
                    const data = await uploadImage(file);
                    setBook({ ...book, imageUrl: data.url });
                    setLoading(false);
                  }
                }}
              />
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
            {loading ? "Updating..." : "Create Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
