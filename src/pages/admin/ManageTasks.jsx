import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axioInstance";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import { FaFileLines, FaPlus } from "react-icons/fa6";
import TaskCard from "../../components/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tasks", {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      if (response?.data) {
        setAllTasks(
          response.data?.tasks?.length > 0 ? response.data.tasks : []
        );
      }

      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/tasks", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks_report.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Error downloading report!");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu={"Manage Task"}>
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Manage Tasks</h2>
              <p className="text-indigo-100 mt-2 text-lg">
                View and manage all your team's tasks
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                onClick={() => navigate("/admin/create-task")}
              >
                <FaPlus className="text-lg" />
                <span>New Task</span>
              </button>

              {allTasks?.length > 0 && (
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-800 hover:bg-purple-900 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  onClick={handleDownloadReport}
                  type="button"
                >
                  <FaFileLines className="text-lg" />
                  <span>Download</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {tabs.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-md">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-indigo-600"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : allTasks?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((user) => user.profileImage)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500 mb-6">
              {filterStatus === "All"
                ? "Create your first task to get started"
                : `No tasks with status "${filterStatus}"`}
            </p>
            {filterStatus === "All" && (
              <button
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                onClick={() => navigate("/admin/create-task")}
              >
                Create New Task
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
