import React, { useState } from "react";
import { ImAttachment } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim() !== "") {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {attachments.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-purple-50 border border-purple-200 px-3 py-2 rounded-lg hover:bg-purple-100 transition"
        >
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <ImAttachment className="text-purple-400 flex-shrink-0 text-sm" />
            <p className="text-xs sm:text-sm text-gray-800 truncate">{item}</p>
          </div>
          <button
            type="button"
            className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition flex-shrink-0"
            onClick={() => handleDeleteOption(index)}
          >
            <MdDelete className="text-base" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 flex items-center gap-2 border-2 border-purple-300 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 min-w-0">
          <ImAttachment className="text-purple-400 flex-shrink-0 text-sm" />
          <input
            type="text"
            placeholder="Add link"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="flex-1 text-xs sm:text-sm text-gray-800 outline-none bg-transparent min-w-0"
          />
        </div>
        <button
          type="button"
          className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium transition shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
          onClick={handleAddOption}
        >
          <IoMdAdd className="text-base" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
