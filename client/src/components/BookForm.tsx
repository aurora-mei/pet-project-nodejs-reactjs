import { useState } from "react";
import { DBook } from "../api/Book";

interface FormBookProps {
  bookData: DBook;
  onSubmit: (book: DBook) => void;
  loading: boolean;
  onFileUpload: (file: File) => Promise<string>; // Function to handle file upload
}

const FormBook: React.FC<FormBookProps> = ({
  bookData,
  onSubmit,
  loading,
  onFileUpload,
}) => {
  const [formData, setFormData] = useState<DBook>(bookData);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedUrl = await onFileUpload(file);
      setFormData({ ...formData, imageUrl: uploadedUrl });
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ _id: "", imageUrl: "", title: "", author: "" });
  };

  return (
    <form
      key={formData._id}
      onSubmit={handleSubmit}
      className="p-4 md:p-5 bg-white rounded-lg text-left my-4 w-80"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        {formData._id ? "Update Book" : "Create Book"}
      </h2>
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            className=" block  text-sm font-medium text-gray-900"
            htmlFor={formData._id + "img"}
          >
            Book image
            <input
              className="hidden"
              id={formData._id + "img"}
              name={formData._id + "img"}
              type="file"
              onChange={handleFileChange}
            />
            <figure className="relative flex justify-center items-center">
              <img
                src={
                  formData.imageUrl ??
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
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Book Title
          </label>
          <input
            className="py-2 px-2 w-full rounded-lg text-black bg-gray-50 border border-gray-300"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-900"
          >
            Book Author
          </label>
          <input
            className="py-2 px-2 w-full border border-gray-300 rounded-lg text-black bg-gray-50"
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-10 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : formData._id
          ? "Update Book"
          : "Create Book"}
      </button>
    </form>
  );
};

export default FormBook;
