import React, { useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/UserContext";
import { useClubAuth } from "../../context/ClubContext";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {backendURL} from '../../utils/getBackendURL'

export const Profile = () => {
  const { user, logoutUser, deleteUser } = useAuth();
  const { club, logoutClub, fetchClub, deleteClub } = useClubAuth();
  const profile = user || club;
  const isClub = !!club;
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const image = isClub ? club.logo : "/user-2.png";
  const [isDark, setIsDark] = useState(()=>{
    const res = localStorage.getItem("mode")
    return res === "dark"
  });

  const toggleMode = () => {
    setIsDark((prev)=>{
      const newMode = !prev
      localStorage.setItem("mode",newMode?"dark":"light")
      return newMode
    })
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("File must be less than 1MB");
      return;
    }
    const formData = new FormData();
    formData.append("logo", file);
    formData.append("username", club.username);

    try {
      const res = await axios.post(
        `${backendURL}/api/club/uploadClubLogo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Logo uploaded:", res.data);
      await fetchClub();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Try again.");
    }
  };

  const handleLogout = async () => {
    navigate("/");
    if (isClub) await logoutClub();
    else await logoutUser();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logged Out Successfully",
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the Account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      navigate("/");
      if (isClub) await deleteClub();
      else await deleteUser();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Deleted",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex flex-col justify-between w-full bg-gray-50">
        <div className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-white w-full rounded-2xl shadow-lg relative">
          <button
            onClick={toggleMode}
            className="absolute top-4 right-4 text-sm rounded-md border-gray-400 hover:scale-120 transition hover:cursor-pointer"
          >
            {isDark ? <LightModeIcon/> : <DarkModeIcon/>}
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
            {isClub ? "Club Profile" : "User Profile"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-gray-300 shadow-sm hover:scale-105 transition-all duration-200 ease-in-out">
                <img
                  src={image}
                  alt="?"
                  className="w-full h-full object-cover"
                />
              </div>

              {isClub && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 px-4 py-2 text-sm font-medium rounded-lg border border-gray-400 text-gray-700 hover:bg-blue-500 hover:text-white transition flex items-center gap-1 shadow-sm"
                  >
                    <UploadIcon fontSize="small" />
                    Upload Logo
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profile?.username}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profile?.email}
                </p>
              </div>

              {!isClub && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="text-lg font-medium text-gray-700">
                      {profile?.firstName || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="text-lg font-medium text-gray-700">
                      {profile?.lastName || "-"}
                    </p>
                  </div>
                </>
              )}

              {isClub && (
                <div>
                  <p className="text-sm text-gray-500">Club Description</p>
                  <p className="text-lg font-medium text-gray-700">
                    {club?.description || "No description provided."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 items-center my-10">
          <button
            className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition shadow"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};
