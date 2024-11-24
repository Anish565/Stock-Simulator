import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { registerUser } from "../utils/apiService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    DOB: "",
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate password
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate DOB
  const validateDOB = (DOB: string) => {
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dobRegex.test(DOB);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, DOB, firstName, lastName } = formData;

    // Form validation
    if (!username || !email || !password || !confirmPassword || !DOB || !firstName || !lastName) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must have at least one uppercase, one symbol, and one number!");
      return;
    }

    if (!validateDOB(DOB)) {
      toast.error("Date of birth must be in the format YYYY-MM-DD!");
      return;
    }

    try {
      setLoading(true);
      console.log("Registering user:", formData);
      await registerUser(username, email, password, DOB, firstName, lastName);
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to register user. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-md text-white">
        <h2 className="text-center text-2xl font-bold mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {/* First Name */}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {/* Date of Birth */}
          <input
            type="text"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            placeholder="Date of Birth (YYYY-MM-DD)"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transform hover:scale-[1.02] transition-all"
            }`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-white/10" />
            <span className="px-4 text-gray-400">or</span>
            <hr className="flex-grow border-t border-white/10" />
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
