import React, { useRef } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/UserContext";
import { useClubAuth } from "../../context/ClubContext";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { backendURL } from "../../utils/getBackendURL";
import { useTheme } from "../../context/ThemeContext";

export const Profile = () => {
  const { user, logoutUser, deleteUser } = useAuth();
  const { club, logoutClub, fetchClub, deleteClub } = useClubAuth();
  const profile = user || club;
  const isClub = !!club;
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const image = isClub ? club.logo : "/user-2.png";
  const { isDark, toggleMode } = useTheme();

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
      <div className="dark:bg-gray-900 transition-colors dark:text-gray-100 min-h-[calc(100vh-64px)] flex flex-col justify-between w-full bg-gray-50">
        <div className="dark:bg-gray-800 dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] dark:text-gray-100 max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-white w-full rounded-2xl shadow-lg relative">
          <button
            onClick={toggleMode}
            className="absolute top-4 right-4 text-sm rounded-md hover:scale-110 transition hover:cursor-pointer text-gray-600 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            {isClub ? "Club Profile" : "User Profile"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isClub && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 px-4 py-2 text-sm font-medium rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition flex items-center gap-1 shadow-md"
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

            <div className="flex-1 space-y-6 w-full">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {profile?.username}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {profile?.email}
                </p>
              </div>

              {!isClub && (
                <>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">First Name</p>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {profile?.firstName || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Name</p>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {profile?.lastName || "-"}
                    </p>
                  </div>
                </>
              )}

              {isClub && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Club Description</p>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {club?.description || "No description provided."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 items-center my-10">
          <button
            className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition shadow-md"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition shadow-md"
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
