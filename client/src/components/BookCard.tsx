import { Link } from "react-router-dom";
import { DBook } from "../api/Book";
interface BookCardProps {
  book: DBook;
  onEdit: () => void;
  onDelete: () => void;
}
const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  return (
    <div
      key={book._id}
      className="p-4 hover:shadow-xl hover:cursor-pointer w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex justify-end items-center gap-x-4 pb-5">
        <button
          type="button"
          title="n"
          className="border border-none"
          onClick={onEdit}
        >
          <i className="fa-solid fa-pen-to-square" />
        </button>
        <button
          type="button"
          title="n"
          className="border border-none"
          onClick={onDelete}
        >
          <i className="fa-solid fa-x " />
        </button>
      </div>

      <div className="flex flex-col items-center ">
        <Link to={`${book.imageUrl}`}>
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
          elaborate, traditional dancing. The dancing is inspired by its Hindi
          beliefs. Most of the dancing portrays tales of good versus evil. To
          watch the dancing is a breathtaking experience. Lombok has some
          impressive points of interest – the majestic Gunung Rinjani is an
          active volcano.
        </p>
      </div>
    </div>
  );
};
export default BookCard;
