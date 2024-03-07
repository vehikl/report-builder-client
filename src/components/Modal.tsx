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
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-30" onClick={onClose} />
        <div className="relative flex max-h-screen w-96 flex-col rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b px-4 py-2 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              &times;
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="overflow-y-hidden p-4">{children}</div>
        </div>
      </div>
    )
  );
};
