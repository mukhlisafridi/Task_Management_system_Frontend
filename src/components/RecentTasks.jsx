import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Recent Tasks</h3>
        <button
          onClick={() => navigate("/admin/tasks")}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md"
        >
          See All →
        </button>
      </div>

      <div className="p-6">
        {tasks?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-indigo-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {task.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                        task.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : task.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {moment(task.createdAt).format("MMM Do, YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No recent tasks found</p>
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
