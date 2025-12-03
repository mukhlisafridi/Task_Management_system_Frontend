import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectedUsers from "../../components/SelectedUsers";
import TodoListInput from "../../components/TodoListInput";
import AddAttachmentsInput from "../../components/AddAttachmentsInput";
import axiosInstance from "../../utils/axioInstance";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {
    try {
      setLoading(true);
      const todolist = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      await axiosInstance.post("/tasks/create", {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task created successfully!");
      clearData();
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating task!");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      setLoading(true);
      const todolist = taskData.todoChecklist.map((item) => {
        const matched = currentTask?.todoChecklist?.find(
          (t) => t.text === item
        );
        return { text: item, completed: matched ? matched.completed : false };
      });

      await axiosInstance.put(`/tasks/${taskId}`, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task updated successfully!");
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating task!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!taskData.title.trim()) return setError("Title is required!");
    if (!taskData.description.trim())
      return setError("Description is required!");
    if (!taskData.dueDate) return setError("Due date is required!");
    if (!taskData.assignedTo.length)
      return setError("Assign to at least one member!");
    if (!taskData.todoChecklist.length) return setError("Add checklist items!");

    if (taskId) updateTask();
    else createTask();
  };

  const getTaskDetailsById = async () => {
    try {
      const res = await axiosInstance.get(`/tasks/${taskId}`);
      const t = res.data;
      setCurrentTask(t);

      setTaskData({
        title: t.title,
        description: t.description,
        priority: t.priority,
        dueDate: t.dueDate ? new Date(t.dueDate) : null,
        assignedTo: t.assignedTo?.map((u) => u._id) || [],
        todoChecklist: t.todoChecklist?.map((c) => c.text) || [],
        attachments: t.attachments || [],
      });
    } catch {
      toast.error("Failed to load task");
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      toast.success("Task deleted!");
      navigate("/admin/tasks");
    } catch {
      toast.error("Error deleting task!");
    }
  };

  useEffect(() => {
    if (taskId) getTaskDetailsById();
  }, [taskId]);

  return (
    <DashboardLayout activeMenu={taskId ? "Manage Task" : "Create Task"}>
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {taskId ? "Update Task" : "Create New Task"}
              </h1>
              <p className="text-indigo-100 text-lg">
                {taskId
                  ? "Modify task details and assignments"
                  : "Fill in the details to create a new task"}
              </p>
            </div>

            {taskId && (
              <button
                onClick={() => setOpenDeleteAlert(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition shadow-md hover:shadow-lg font-medium"
              >
                <MdDelete className="text-xl" /> Delete
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full px-4 py-2.5 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  value={taskData.title}
                  onChange={(e) => handleValueChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter description"
                  className="w-full px-4 py-2.5 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                  value={taskData.description}
                  onChange={(e) =>
                    handleValueChange("description", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Task Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border-2 border-purple-400 bg-purple-100 text-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer font-semibold"
                    value={taskData.priority}
                    onChange={(e) =>
                      handleValueChange("priority", e.target.value)
                    }
                  >
                    <option value="Low" className="bg-white">
                      Low
                    </option>
                    <option value="Medium" className="bg-white">
                      Medium
                    </option>
                    <option value="High" className="bg-white">
                      High
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    selected={taskData.dueDate}
                    onChange={(date) => handleValueChange("dueDate", date)}
                    minDate={new Date()}
                    placeholderText="Select due date"
                    className="w-full px-4 py-2.5 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                Assignment
              </h3>

              <SelectedUsers
                selectedUser={taskData.assignedTo}
                setSelectedUser={(v) => handleValueChange("assignedTo", v)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                TODO Checklist
              </h3>

              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(v) => handleValueChange("todoChecklist", v)}
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Attachments
              </h3>

              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(v) => handleValueChange("attachments", v)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/tasks")}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {taskId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{taskId ? "Update Task" : "Create Task"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title={"Delete Task"}
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
