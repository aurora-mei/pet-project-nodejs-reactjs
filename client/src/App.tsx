import { useState, useEffect } from "react";
import "./App.css";
type DBook = {
  _id: string;
  title: string;
};
function App() {
  const [books, setBooks] = useState<DBook[]>([]);
  const [title, setTitle] = useState("");
  const PORT = 3000;

  useEffect(() => {
    //1.take and set data from backend
    const fetchBooks = async () => {
      const response = await fetch(`http://localhost:${PORT}/books`); //fetch từ backend
      const books = await response.json(); //chuyển thành json
      setBooks(books); //set state
    };
    fetchBooks();
  }, []);
  async function handlerCreateBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch(`http://localhost:${PORT}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
  }
  return (
    <div className="App">
      <div className=" grid grid-cols-5 gap-10 ">
        {books.map((book) => (
          <div
            key={book._id}
            className="p-5 hover:shadow-xl hover:cursor-pointer w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV1qiyInwkmtWtFogyKLsvLmEaivie4U3Gg&s"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Visual Designer
              </span>
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
          className="py-2 border border-gray-200 rounded-lg"
          type="text"
          id="bookTitle"
          name="bookTitle"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button className="px-10 py-2 bg-white text-black">Create Book</button>
      </form>
    </div>
  );
}

export default App;
