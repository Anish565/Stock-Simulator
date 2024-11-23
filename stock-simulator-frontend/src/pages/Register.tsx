import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { registerUser } from "../utils/apiService";

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
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Registration Form */}
      <div className="mt-8 p-6 bg-[#8b4242] rounded-lg shadow-lg w-full max-w-sm text-white">
        <h2 className="text-center text-lg mb-4">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="text"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            placeholder="Date of Birth (YYYY-MM-DD)"
            className="w-full px-3 py-2 rounded text-black"
          />

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#5e4b8b] text-white hover:bg-[#4a3b72] transition"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
