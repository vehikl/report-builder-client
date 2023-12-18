import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="absolute w-full h-full bg-black opacity-30" onClick={onClose} />
        <div className="w-96 relative bg-white max-h-screen rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between px-4 py-2 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              &times;
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    )
  );
};
