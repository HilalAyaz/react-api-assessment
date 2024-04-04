import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";

// Define navigation items with their names and links
const NavItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Form",
    link: "/form",
  },
];

const Header = ({ isLoggedIn, handleSignOut }) => {
  // State for toggling mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    handleSignOut(); // Call parent component's logout function
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-slate-600/80 w-full">
      <div className="px-5 flex flex-row items-center justify-between">
        {/* Logo or site title */}
        <div className="flex py-4">
          <h1 className="text-2xl text-gray-300 font-bold">InaraTech</h1>
        </div>

        {/* Navigation menu for desktop */}
        <div className="hidden md:flex md:justify-center md:items-center">
          <ul className="flex flex-row gap-5">
            {/* Map through navigation items */}
            {NavItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="text-lg text-gray-300 font-bold hover:text-gray-800 duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Render sign out button if user is logged in */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 font-semibold rounded-lg transition duration-300 ease-in-out"
              >
                Sign Out
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={toggleMenu} />
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-16 right-0 bg-slate-600 w-full md:hidden">
            <ul className="flex flex-col justify-center items-center gap-5 py-5">
              {/* Map through navigation items */}
              {NavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    onClick={toggleMenu} // Close menu on click
                    className="text-lg font-bold hover:text-gray-800 duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Render sign out button if user is logged in */}
              {isLoggedIn && (
                <li>
                  <button
                    onClick={() => {
                      handleLogout(); // Logout and close menu on click
                      toggleMenu();
                    }}
                    className="text-lg font-semibold hover:text-gray-800 duration-300"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
