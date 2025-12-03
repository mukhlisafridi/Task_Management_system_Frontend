import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout";
import axiosInstance from "../../utils/axioInstance";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import RecentTasks from "../../components/RecentTasks";
import CustomPieChart from "../../components/CustomPieChart";
import CustomBarChart from "../../components/CustomBarChart";

const PIE_COLORS = ["#e83a3a", "#FF8C00", "#21d351"];
const BAR_COLORS = ["#21d351", "#FF8C00", "#e83a3a"];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevel || {};

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(priorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tasks/user-dashboard-data");

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching user dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu={"Dashboard"}>
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-indigo-600"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="p-6 space-y-6">
        {/* Welcome Banner - PURPLE */}
        <div
          className="rounded-xl p-6 shadow-lg text-white"
          style={{ backgroundColor: "rgb(147, 24, 250)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome, {currentUser?.name}!
              </h2>
              <p className="text-purple-100 mt-1">
                {moment().format("dddd, Do MMMM YYYY")}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <button
                className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md"
                onClick={() => navigate("/user/tasks")}
                style={{ color: "rgb(147, 24, 250)" }}
              >
                View My Tasks
              </button>
            </div>
          </div>
        </div>
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-md text-white">
              <h3 className="text-purple-100 text-sm font-medium">
                Total Tasks
              </h3>
              <p className="text-4xl font-bold mt-2">
                {dashboardData?.charts?.taskDistribution?.All || 0}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-md text-white">
              <h3 className="text-purple-100 text-sm font-medium">
                Pending Tasks
              </h3>
              <p className="text-4xl font-bold mt-2">
                {dashboardData?.charts?.taskDistribution?.Pending || 0}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-md text-white">
              <h3 className="text-purple-100 text-sm font-medium">
                In Progress
              </h3>
              <p className="text-4xl font-bold mt-2">
                {dashboardData?.charts?.taskDistribution?.InProgress || 0}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-md text-white">
              <h3 className="text-purple-100 text-sm font-medium">Completed</h3>
              <p className="text-4xl font-bold mt-2">
                {dashboardData?.charts?.taskDistribution?.Completed || 0}
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Distribution
            </h3>
            <div className="h-64">
              <CustomPieChart
                data={pieChartData}
                label="Tasks"
                colors={PIE_COLORS}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Priority Levels
            </h3>
            <div className="h-64">
              <CustomBarChart data={barChartData} colors={BAR_COLORS} />
            </div>
          </div>
        </div>
        {dashboardData?.recentTasks && (
          <RecentTasks tasks={dashboardData.recentTasks} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
