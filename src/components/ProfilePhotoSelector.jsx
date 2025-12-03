import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden cursor-pointer border-4 border-indigo-200 hover:border-indigo-400 transition-all shadow-md"
          onClick={onChooseFile}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCamera className="text-3xl text-indigo-400" />
          )}
        </div>

        {!image ? (
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2.5 rounded-full hover:shadow-lg transition-all"
            onClick={onChooseFile}
          >
            <FaCamera className="text-sm" />
          </button>
        ) : (
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2.5 rounded-full hover:bg-red-600 transition-all shadow-md"
            onClick={handleRemoveImage}
          >
            <MdDelete className="text-sm" />
          </button>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoSelector;
