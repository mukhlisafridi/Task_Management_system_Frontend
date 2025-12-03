import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`relative px-4 md:px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === tab.label
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
          onClick={() => setActiveTab(tab.label)}
          type="button"
        >
          <div className="flex items-center gap-2">
            <span>{tab.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === tab.label
                ? "bg-white/20 text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
              {tab.count}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
