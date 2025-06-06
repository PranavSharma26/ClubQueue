import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { backendURL } from "../../utils/getBackendURL";
export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isUser, setIsUser] = useState(true);

  const onSubmit = async (data) => {
    try {
      const { bio, ...userDataRaw } = data;
      const { firstName, lastName, ...clubDataRaw } = data;

      const userData = {
        ...userDataRaw,
        firstName,
        lastName,
        isVerified: false,
      };

      const clubData = {
        ...clubDataRaw,
        bio,
        isVerified: false,
      };

      const endpoint = isUser
        ? `${backendURL}/api/signup/user`
        : `${backendURL}/api/signup/club`;

      const response = await axios.post(endpoint, isUser ? userData : clubData);
      console.log("Successfull");

      if (response.status >= 400) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("club");

      const expiryTime = Date.now() + 10 * 60 * 1000;
      if (isUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({ data: userData, expiresAt: expiryTime })
        );
      } else {
        localStorage.setItem(
          "club",
          JSON.stringify({ data: clubData, expiresAt: expiryTime })
        );
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Please Verify Your Email",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      navigate("/verify");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const handleToggle = () => setIsUser(!isUser);

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
        <div className="flex mb-8 rounded-xl overflow-hidden border border-black shadow-md">
          <button
            className={`px-6 py-2 text-xl sm:text-2xl font-semibold transition ${
              isUser
                ? "bg-amber-300 text-black"
                : "bg-gray-200 hover:bg-amber-200"
            }`}
            onClick={handleToggle}
          >
            User
          </button>
          <button
            className={`px-6 py-2 text-xl sm:text-2xl font-semibold transition ${
              isUser ? "hover:bg-amber-200" : "bg-amber-300 text-black"
            }`}
            onClick={handleToggle}
          >
            Club
          </button>
        </div>

        <div className="w-full max-w-md sm:max-w-xl bg-white border-2 border-gray-300 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-6">
          <div className="flex justify-center text-4xl sm:text-5xl font-extrabold">
            <p className="text-amber-400 mr-2">{isUser ? "User" : "Club"}</p>
            <p>Sign</p>
            <p className="text-[#EE2B69] ml-1">up</p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                {...register("username", {
                  required: "Name Required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters are required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters allowed",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_#!@*$()-]+$/,
                    message:
                      "Only letters, numbers, and underscores are allowed",
                  },
                })}
                type="text"
                placeholder={`Enter ${isUser ? "Username" : "Clubname"}`}
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter Email"
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {!isUser ? (
              <div>
                <textarea
                  {...register("bio", {
                    maxLength: {
                      value: 200,
                      message: "Maximum 200 characters allowed",
                    },
                  })}
                  className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter Club Bio"
                />
                {errors.bio && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <input
                    {...register("firstName", { maxLength: 20 })}
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName", { maxLength: 20 })}
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Signing up..." : "Signup"}
              className="w-full p-3 text-lg rounded-xl bg-[#EE2B69] text-white font-bold border-2 border-black transition hover:opacity-90 cursor-pointer"
            />
          </form>

          <button
            className="text-blue-500 hover:underline hover:text-blue-700 text-center text-sm mt-2"
            onClick={() => navigate("/signin")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </>
  );
};
