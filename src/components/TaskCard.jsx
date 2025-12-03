import React from "react";
import Progress from "./Progress";
import moment from "moment";
import AvatarGroup from "./AvatarGroup";
import { FaFileLines } from "react-icons/fa6";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";  
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-5 shadow-md border border-gray-200 cursor-pointer hover:shadow-xl transition-all"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`text-xs font-semibold ${getStatusTagColor()} px-3 py-1 rounded-full border`}>
          {status}
        </div>
        <div className={`text-xs font-semibold ${getPriorityTagColor()} px-3 py-1 rounded-full border`}>
          {priority}
        </div>
      </div>

      <div className={`border-l-4 pl-4 ${
        status === "In Progress"
          ? "border-indigo-500"
          : status === "Completed"
          ? "border-emerald-500"
          : "border-amber-500"
      }`}>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description}
        </p>
        <p className="text-sm text-gray-700 font-medium mb-2">
          Completed: <span className="font-bold text-indigo-600">
            {completedTodoCount} / {todoChecklist?.length || 0}
          </span>
        </p>
        <Progress progress={progress} status={status} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div>
            <p className="font-medium">Start</p>
            <p className="text-gray-900">{moment(createdAt).format("MMM Do")}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Due</p>
            <p className="text-gray-900">{moment(dueDate).format("MMM Do")}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <AvatarGroup avatars={assignedTo || []} maxVisible={3} />
          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg">
              <FaFileLines className="text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;