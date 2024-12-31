interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white-300 p-6 rounded shadow-lg w-1/3">
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 font-bold absolute top-2 right-2"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
