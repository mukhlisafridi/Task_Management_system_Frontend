import React, { useState } from "react";

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (index) => {
    setFailedImages(prev => new Set(prev).add(index));
  };

  const getGradient = (index) => {
    const gradients = [
      'from-pink-400 to-purple-500',
      'from-blue-400 to-cyan-500',
      'from-green-400 to-emerald-500',
      'from-orange-400 to-red-500',
      'from-indigo-400 to-purple-500',
      'from-teal-400 to-blue-500',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <div key={index} className="-ml-3 first:ml-0">
          {!avatar || failedImages.has(index) ? (
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center bg-gradient-to-br ${getGradient(index)}`}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <img
              src={avatar}
              alt={`Avatar-${index + 1}`}
              onError={() => handleImageError(index)}
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
          )}
        </div>
      ))}

      {avatars.length > maxVisible && (
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-sm font-semibold text-indigo-700 rounded-full border-2 border-white shadow-sm -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;