import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition shadow-md hover:shadow-lg"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert