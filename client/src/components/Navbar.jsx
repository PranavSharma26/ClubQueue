import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSubmit = () => {
    navigate("/signin");
  };
  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <div className="border-b-1 p-2 px-4 flex flex-row justify-between items-center">
      <div className="flex text-xl">
        <p className="font-stretch-150% font-extrabold">Club</p>
        <p className="font-stretch-150% font-extrabold text-pink-600">Queue</p>
      </div>

      {user ? (
        <div className="flex gap-2 items-center">
          <p className="text-black">{user?.username}</p>
          <button onClick={handleLogout}>
            <AccountCircleIcon />
          </button>
        </div>
      ) : (
        <button
          className="flex gap-1 justify-center items-center border-3 rounded-lg p-1 px-2"
          onClick={handleSubmit}
        >
          <p>Login</p>
          <LoginIcon />
        </button>
      )}
    </div>
  );
};
