import React, { useContext, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/UserContext";
import { useClubAuth } from "../../context/ClubContext";
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";

export const Profile = () => {
  const { user } = useAuth();
  const { club, fetchClub } = useClubAuth();
  const profile = user || club;
  const isClub = !!club;
  const fileInputRef = useRef(null);

  let image = isClub ? club.logo : "/user-2.png";

  const handleLogoClick = () => {
    if (isClub && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
        "http://localhost:3000/api/club/uploadClubLogo",
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

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {isClub ? "Club Profile" : "User Profile"}
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300 transition-all">
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          </div>

          {isClub && (
            <>
              <button
                type="button"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                className="mt-3 px-3 py-1 text-sm font-medium rounded border border-gray-500 hover:ring-1 hover:ring-blue-500 flex items-center gap-1"
              >
                <UploadIcon fontSize="small" />
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

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-lg font-medium">{profile?.username}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-lg font-medium">{profile?.email}</p>
          </div>

          {isClub && (
            <div>
              <p className="text-gray-500">Club Description</p>
              <p className="text-lg font-medium">
                {club?.description || "No description provided."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
