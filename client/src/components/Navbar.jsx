import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Swal from "sweetalert2";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    navigate("/");
    logout()
    setAnchorEl(null)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logged Out Successfully",
      timerProgressBar:true,
      showConfirmButton: false,
      timer: 1000
    });
  }

  const handleProfile = () => {
    navigate(`/user/${user.username}`)
  };

  const handleSettings = () => {
    navigate('/user/settings')
  };

  return (
    <div className="border-b-1 p-2 px-4 flex flex-row justify-between items-center">
      <div className="flex text-xl hover:cursor-pointer" onClick={handleHome}>
        <p className="font-stretch-150% font-extrabold">Club</p>
        <p className="font-stretch-150% font-extrabold text-[#EE2B69]">Queue</p>
      </div>

      {user ? (
        <>
          <div className="flex gap-1  items-center rounded-xl">
            <p className="text-sm text-black tracking-tight normal-case">{user?.username}</p>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon className="text-black hover:bg-gray-200 rounded-full hover:text-blue-600"/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // MenuListProps={{
              //   "aria-labelledby": "basic-button",
              // }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </>
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
