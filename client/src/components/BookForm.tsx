import { AppDispatch } from "../store/Store.ts";
import { useDispatch } from "react-redux";
import { uploadImageBook } from "../store/BookSlice.ts";
import { DBook } from "../api/Book";
import { useState } from "react";
interface BookFormProps {
  onSubmit: () => void;
  initialBook?: DBook;
  loading: boolean;
}
const form = ({ onSubmit, initialBook, loading }: BookFormProps) => {
  const [book, setBook] = useState<DBook>(initialBook ?? {});
  const dispatch = useDispatch<AppDispatch>();
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 m-4 md:p-5 bg-white rounded-lg text-left w-72 "
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        {initialBook ? "Update Book" : "Create Book"}
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
        {loading
          ? "Uploading..."
          : initialBook!._id
          ? "Update Book"
          : "Create Book"}
      </button>
    </form>
  );
};
export default form;
