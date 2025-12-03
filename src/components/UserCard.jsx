import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
    
      <div className="flex items-center gap-4 mb-4">
        {userInfo?.profileImage ? (
          <img
            src={userInfo.profileImage}
            alt={userInfo?.name}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-200"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {userInfo?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-gray-900 truncate">{userInfo?.name}</p>
          <p className="text-sm text-gray-500 truncate">{userInfo?.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 border border-amber-200 rounded-full">
          <span className="text-[10px] font-medium text-amber-700">Pending</span>
          <span className="text-xs font-bold text-amber-800">{userInfo?.pendingTasks || 0}</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 bg-indigo-100 border border-indigo-200 rounded-full">
          <span className="text-[10px] font-medium text-indigo-700">Progress</span>
          <span className="text-xs font-bold text-indigo-800">{userInfo?.inProgressTasks || 0}</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 border border-emerald-200 rounded-full">
          <span className="text-[10px] font-medium text-emerald-700">Done</span>
          <span className="text-xs font-bold text-emerald-800">{userInfo?.completedTask || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;