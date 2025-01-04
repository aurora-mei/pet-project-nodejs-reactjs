interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-white-300 p-6 rounded shadow-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          title="Close Modal"
          className="text-white-500 font-bold absolute top-2 right-2 border border-none outline-none focus:outline-none"
        >
          <i className="fa-solid fa-x " />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
