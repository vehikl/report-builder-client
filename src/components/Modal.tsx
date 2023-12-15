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
        <div className="relative flex flex-col bg-white">
          <div className="flex justify-between">
            {title}
            <span className="cursor-pointer" onClick={onClose}>
              &times;
            </span>
          </div>
          {children}
        </div>
      </div>
    )
  );
};
