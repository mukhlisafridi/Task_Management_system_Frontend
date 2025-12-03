import React, { useState } from "react";
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import axiosInstance from "../../utils/axioInstance";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be 6+ chars");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (profilePic) {
        const res = await uploadImage(profilePic);
        profileImageUrl = res.imageURL || "";
      }

      const response = await axiosInstance.post("/auth/register", {
        name: fullName,
        email,
        password,
        profileImage: profileImageUrl,
        admin_JOIN_Code: adminInviteToken,
      });

      if (response.data.success) {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed!";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md ">
          <div className="bg-white rounded-2xl shadow-2xl ">
            <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-full">
                    <FaPeopleGroup className="text-3xl text-indigo-600" />
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mt-6">
                  Join Project Flow
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <ProfilePhotoSelector
                  image={profilePic}
                  setImage={setProfilePic}
                />

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 pr-12"
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Admin Invite Token (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type={showAdminInviteToken ? "text" : "password"}
                      value={adminInviteToken}
                      onChange={(e) => setAdminInviteToken(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg pr-12 focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter admin code"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 text-gray-500"
                      onClick={() =>
                        setShowAdminInviteToken(!showAdminInviteToken)
                      }
                    >
                      {showAdminInviteToken ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg uppercase"
                >
                  {loading ? "SIGNING UP..." : "SIGN UP"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 ml-1"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 md:fixed md:right-0 md:top-0 md:bottom-0">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=1600&fit=crop"
          className="w-full h-full object-cover"
          alt="Signup background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90"></div>

        <div className="absolute inset-0 flex items-center justify-center p-10 text-white text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Create Your Account</h1>
            <p className="text-indigo-200">Start your project journey today.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
