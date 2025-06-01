import React, { useContext } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/UserContext";
import { useClubAuth } from "../../context/ClubContext";

export const Profile = () => {
  const { user } = useAuth();
  const { club } = useClubAuth();

  const profile = user || club;
  const isClub = !!club;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {isClub ? "Club Profile" : "User Profile"}
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-500">
            ?
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
                <p className="text-lg font-medium">{club?.description || "No description provided."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
