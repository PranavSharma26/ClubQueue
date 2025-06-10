import React from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Swal from "sweetalert2";
import { useClubAuth } from "../context/ClubContext";

export const Navbar = () => {
  const navigate = useNavigate();

  const { user, logoutUser } = useAuth();
  const { club, logoutClub } = useClubAuth();
  const isUser = !!user;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    navigate("/signin");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    navigate("/");
    if (isUser) await logoutUser();
    else await logoutClub();
    setAnchorEl(null);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logged Out Successfully",
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleProfile = () => {
    if (isUser) navigate(`/user/${encodeURIComponent(user.username)}`);
    else navigate(`/club/${encodeURIComponent(club.username)}`);
  };

  const handleDashboard = () => {
    navigate(`/club/dashboard`);
  };

  const handleLiked = () => {
    navigate(`/user/liked`);
  };

  return (
    <div className="border-b border-gray-300 dark:border-gray-700 p-2 px-4 flex flex-row justify-between items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div
        className="flex text-2xl hover:cursor-pointer"
        onClick={handleHome}
      >
        <p className="font-stretch-150% font-extrabold text-black dark:text-gray-200">Club</p>
        <p className="font-stretch-150% font-extrabold text-[#EE2B69] ">Queue</p>
      </div>

      {user || club ? (
        <>
          <div className="flex gap-1 items-center rounded-xl">
            <p className="hidden [@media(min-width:500px)]:block text-sm text-black dark:text-gray-200 tracking-tight normal-case">
              {user?.username || club?.username}
            </p>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="p-0 min-w-0"
            >
              {!isUser && club.logo ? (
                <img
                  src={club.logo}
                  alt="?"
                  className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <AccountCircleIcon className="text-black dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full" />
              )}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  backgroundColor: window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#1f2937" // Tailwind gray-800
                    : "#fff",
                  color: window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#e5e7eb" // Tailwind gray-200
                    : "#000",
                },
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              {!isUser && <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>}
              {isUser && <MenuItem onClick={handleLiked}>Liked</MenuItem>}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </>
      ) : (
        <button
          className="flex gap-1 justify-center items-center border-3 rounded-lg p-1 px-2 border-black dark:border-gray-200 text-black dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          onClick={handleSubmit}
        >
          <p>Login</p>
          <LoginIcon />
        </button>
      )}
    </div>
  );
};
