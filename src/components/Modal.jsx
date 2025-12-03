import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl bg-white transform transition-all">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition text-white"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal