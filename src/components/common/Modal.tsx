import { useUI } from "@lib/context/UiContext";
import type { ReactNode, FC } from "react";

interface ModalProps {
  children?: ReactNode;
  props?: any;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const { closeModal } = useUI();

  return (
    <div
      className="fixed inset-0 z-50 px-4 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={closeModal}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
