import React, { useContext } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/UserContext";
import { dateTimeFormat } from "../../functions/functions";
import { useClubAuth } from "../../context/ClubContext";

export const Profile = () => {
  const { user } = useAuth();
  const { club } = useClubAuth();

  const profile = user || club;

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-md bg-white border-2 border-gray-200 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center flex justify-center">
            <p>{!!user ? "User" : "Club"}</p>
            <p className="text-[#EE2B69] ml-1"> Profile</p>
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-gray-600">Username</span>
              <span className="text-gray-900">{profile.username}</span>
            </div>
            {!!club ? (
              <>
                <div className="border-b pb-2">
                  <span className="font-medium text-gray-600 block mb-1">
                    Description
                  </span>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {club.description || "-"}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium text-gray-600">First Name</span>
                  <span className="text-gray-900">
                    {user.firstName ? user.firstName : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium text-gray-600">Last Name</span>
                  <span className="text-gray-900">
                    {user.lastName ? user.lastName : "-"}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-gray-600">Email</span>
              <span className="text-gray-900">{profile.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Created At</span>
              <span className="text-gray-900">
                {dateTimeFormat(profile.createdAt.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
