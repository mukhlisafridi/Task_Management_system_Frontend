import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axioInstance";
import { FaUsers } from "react-icons/fa";
import Modal from "./Modal";
import AvatarGroup from "./AvatarGroup";

const SelectedUsers = ({ selectedUser, setSelectedUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUser, setTempSelectedUser] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users");
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUser((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUser(tempSelectedUser);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUser.includes(user._id))
    .map((user) => user.profileImage);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUser.length === 0) {
      setTempSelectedUser([]);
    }
  }, [selectedUser]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
          type="button"
        >
          <FaUsers className="text-lg" /> Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Select Team Members"}
      >
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {allUsers?.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-indigo-50/50 transition"
            >
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUser.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            className="btn-secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleAssign}
          >
            Assign Members
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectedUsers;
