import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axioInstance";
import DashboardLayout from "../../components/DashboardLayout";
import { FaFileAlt, FaUsers } from "react-icons/fa";
import UserCard from "../../components/UserCard";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users/get-users");

      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/users", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "team_members_report.xlsx");
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
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <FaUsers className="text-4xl" />
                Team Members
              </h2>
              <p className="text-indigo-100 mt-2 text-lg">
                {allUsers.length} member{allUsers.length !== 1 ? "s" : ""} in
                your organization
              </p>
            </div>

            {allUsers.length > 0 && (
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-800 hover:bg-purple-900 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                onClick={handleDownloadReport}
              >
                <FaFileAlt className="text-lg" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-indigo-600"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : allUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No team members yet
            </h3>
            <p className="text-gray-500">
              Team members will appear here once they sign up
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
