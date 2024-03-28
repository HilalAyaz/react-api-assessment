import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  // State variables for form fields, form type, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Indicates whether it's a signup form
  const [error, setError] = useState(""); // Error message for form validation

  // Regular expressions for form field validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  // Get navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form field validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character."
      );
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare user data for login or signup
    const userData = { email, password };
    if (isSignup && !username) {
      setError("Please enter a username for signup.");
      return;
    }

    if (isSignup) {
      userData.username = username;
    }

    // Simulating login with default credentials for testing
    const defaultEmail = "test@example.com";
    const defaultPassword = "Test1234";

    // Check if entered credentials match default credentials
    if (email === defaultEmail && password === defaultPassword) {
      // Save user data to local storage and call onLogin callback
      localStorage.setItem("userData", JSON.stringify(userData));
      onLogin(userData);
      navigate("/"); // Redirect to home page after successful login
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  // Determine form title based on form type (login or signup)
  const formTitle = isSignup ? "Sign Up" : "Sign In";

  return (
    <div className="flex items-center justify-center h-[600px]">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-400/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h2 className="text-center text-xl font-bold mb-4">{formTitle}</h2>
        {/* Conditional rendering for username input in signup form */}
        {isSignup && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        {/* Email input field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Password input field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Conditional rendering for confirm password input in signup form */}
        {isSignup && (
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        {/* Error message display */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {/* Submit button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {formTitle}
          </button>
        </div>
        {/* Link to switch between login and signup forms */}
        <div className="mt-4 text-center">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignup(false)}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p>
              New here?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
