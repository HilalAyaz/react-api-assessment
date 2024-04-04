import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        error = !value.match(/^\S+@\S+\.\S+$/)
          ? "Invalid email address. Did you enter your email or your cat's meow?"
          : "";
        break;
      case "password":
        error =
          value.length < 8
            ? "Password must be at least 8 characters long. Make sure it's strong enough to fend off a determined squirrel!"
            : !value.match(/[a-zA-Z]/)
            ? "Password must contain at least one letter. No password? No taco. 🌮"
            : !value.match(/\d/)
            ? "Password must contain at least one digit. Don't forget the secret number!"
            : "";
        break;
      case "confirmPassword":
        error =
          value !== formData.password
            ? "Passwords do not match. Looks like your passwords are playing hide and seek."
            : "";
        break;
      case "username":
        error =
          isSignup && !value.trim()
            ? "Please enter a username. A clever username is like a good joke - it leaves an impression!"
            : "";
        break;
      case "phoneNumber":
        error = !value.match(/^\d{10}$/)
          ? "Please enter a valid 10-digit phone number. Don't worry, robots won't call you... we think."
          : "";
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateInput(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username, phoneNumber } = formData;
    const fieldsToValidate = ["email", "password"];
    if (isSignup) {
      fieldsToValidate.push("username", "phoneNumber", "confirmPassword");
    }

    let isFormValid = true;
    fieldsToValidate.forEach((field) => {
      validateInput(field, formData[field]);
      if (formErrors[field]) {
        isFormValid = false;
      }
    });

    if (!isFormValid) return;

    // Simulate login/signup logic
    const defaultEmail = "test@example.com";
    const defaultPassword = "Test1234";

    if (email === defaultEmail && password === defaultPassword) {
      const userData = { email, password, phoneNumber };
      if (isSignup) userData.username = username;
      localStorage.setItem("userData", JSON.stringify(userData));
      onLogin(userData);
      navigate("/");
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        general: "Invalid credentials. Please try again.",
      }));
    }
  };

  const formTitle = isSignup ? "Sign Up" : "Sign In";

  return (
    <div className="flex items-center justify-center h-[600px]">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-400/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h2 className="text-center text-xl font-bold mb-4">{formTitle}</h2>
        {isSignup && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {formErrors.username && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.username}
              </div>
            )}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => validateInput("email", formData.email)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {formErrors.email && (
            <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => validateInput("password", formData.password)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {formErrors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formErrors.password}
            </div>
          )}
        </div>
        {isSignup && (
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() =>
                validateInput("confirmPassword", formData.confirmPassword)
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {formErrors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.confirmPassword}
              </div>
            )}
          </div>
        )}

        {isSignup && (
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={() => validateInput("phoneNumber", formData.phoneNumber)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {formErrors.phoneNumber && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.phoneNumber}
              </div>
            )}
          </div>
        )}

        {formErrors.general && (
          <div className="text-red-500 text-sm mt-1">{formErrors.general}</div>
        )}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {formTitle}
          </button>
        </div>
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
