import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim() !== "") {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {todoList.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-purple-50 border border-purple-200 px-3 py-2 rounded-lg hover:bg-purple-100 transition"
        >
          <p className="text-xs sm:text-sm text-gray-800 flex-1 min-w-0 truncate">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>
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
        <input
          type="text"
          placeholder="Add checklist item"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="flex-1 px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-xs sm:text-sm min-w-0"
        />
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

export default TodoListInput;
