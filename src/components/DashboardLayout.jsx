import React, { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/slice/userSlice";
import axiosInstance from "../utils/axioInstance";
import toast from "react-hot-toast";
import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from "../utils/constants";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = ({ children, activeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';  
    } else {
      document.body.style.overflow = 'unset';   
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(signOutSuccess());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(signOutSuccess());
      toast.success("Logged out!");
      navigate("/login");
    }
  };

  const handleNavigation = (item) => {
    setSidebarOpen(false);
    if (item.path === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  const menuData = currentUser?.role === "admin" ? SIDE_MENU_DATA : USER_SIDE_MENU_DATA;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl border-r border-gray-200 z-40 overflow-hidden transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="pt-8 pb-6 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h1 className="text-2xl font-bold text-white">Project Flow</h1>
          <p className="text-sm text-indigo-100 mt-1">
            {currentUser?.role === "admin" ? "Admin Panel" : "User Panel"}
          </p>
        </div>

        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            {currentUser?.profileImage ? (
              <img
                src={currentUser.profileImage}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-300 ring-offset-2"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">
                  {currentUser?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {menuData.map((item) => {
            const isActive = activeMenu === item.label;
            const isLogout = item.path === "logout";

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                  isLogout
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                    : isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`}
              >
                <item.icon className={`text-xl ${isActive ? "animate-pulse" : ""}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <p className="text-xs text-center text-gray-500">© 2025 Project Flow</p>
        </div>
      </aside>
      <main className="lg:ml-64 min-h-screen bg-gray-50 overflow-y-auto">
        <div className="lg:hidden sticky top-0 z-20 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Project Flow</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
            >
              {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;