import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      className="bg-secondary p-6 rounded-lg shadow-2xl drop-shadow-lg shadow-inner flex flex-col justify-center items-center backdrop:bg-black/70"
      onCancel={onClose}
      aria-labelledby="modal-title"
    >
      <button
        className="absolute top-3 right-3 text-white-400 hover:text-gray-900 hover:bg-gray-300 p-1 rounded-full transition text-lg"
        onClick={onClose}
        aria-label="Close modal"
      >
        x
      </button>
      {children}
    </dialog>
  );
}
