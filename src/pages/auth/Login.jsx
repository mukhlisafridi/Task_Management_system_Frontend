import React, { useState } from "react";
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axioInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { loading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    try {
      dispatch(signInStart());

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        dispatch(signInSuccess(response.data.user));
        toast.success("Login successful!");

        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed!";
      setError(errorMsg);
      dispatch(signInFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-full">
                    <FaPeopleGroup className="text-3xl text-indigo-600" />
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mt-6">
                  Project Flow
                </h1>

                <p className="text-gray-600 mt-2">
                  Manage your projects efficiently
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="font-semibold text-indigo-600 ml-1"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 relative h-full">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=1600&fit=crop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90"></div>

        <div className="absolute inset-0 flex items-center justify-center p-10 text-white text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-indigo-200">
              Continue managing your workflow seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
