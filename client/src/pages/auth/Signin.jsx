import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../context/UserContext";
import { useClubAuth } from "../../context/ClubContext";
import { backendURL } from "../../utils/getBackendURL";

export const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);
  const { loginUser } = useAuth();
  const { loginClub } = useClubAuth();
  const handleToggle = () => {
    setIsUser(!isUser);
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword')
  }

  const onSubmit = async (data) => {
    try {
      const endpoint = isUser
        ? `${backendURL}/api/signin/user`
        : `${backendURL}/api/signin/club`;
      const response = await axios.post(endpoint, data, {
        withCredentials: true,
      });
      console.log("Successful");

      const meResponse = await axios.get(`${backendURL}/api/me`, {
        withCredentials: true,
      });

      if (meResponse.data.role === "user") loginUser(meResponse.data.data);
      else if (meResponse.data.role === "club")
        await loginClub(meResponse.data.data);

      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Log In Successfully",
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log("Error Logging in", error.response.data.error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-10 min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-blue-950 dark:to-gray-950  from-pink-100 to-yellow-100">
        <div className="flex mb-8 shadow-md rounded-xl overflow-hidden border border-black dark:border-white">
          <button
            className={`px-6 py-2 text-xl sm:text-2xl font-semibold transition ${
              isUser
                ? "bg-amber-300 dark:bg-yellow-500 text-black dark:text-white"
                : "bg-gray-200 hover:bg-amber-200 dark:bg-gray-900 dark:hover:bg-gray-950 dark:text-white"
            }`}
            onClick={handleToggle}
          >
            User
          </button>
          <button
            className={`px-6 py-2 text-xl sm:text-2xl font-semibold transition ${
              isUser ? "hover:bg-amber-200 dark:hover:bg-gray-950 dark:text-white" : "bg-amber-300 dark:bg-yellow-500 text-black dark:text-white"
            }`}
            onClick={handleToggle}
          >
            Club
          </button>
        </div>

        <div className="w-full max-w-md sm:max-w-xl bg-white border-2 border-gray-300 rounded-3xl shadow-2xl px-6 py-10 flex flex-col items-center gap-10 dark:bg-gray-900">
          <div className="flex justify-center text-4xl sm:text-5xl font-extrabold">
            <p className="text-amber-400 mr-2">{isUser ? "User" : "Club"}</p>
            <p className="dark:text-white">Log</p>
            <p className="text-[#EE2B69] ml-1">in</p>
          </div>

          <form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                {...register("credential", {
                  required: {
                    value: true,
                    message: "Username or Email is Required",
                  },
                })}
                type="text"
                placeholder={`Enter ${
                  isUser ? "Username" : "Clubname"
                } or Email`}
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border dark:bg-gray-800 dark:text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.credential && (
                <p className="text-sm text-red-500 mt-1 ml-1">
                  {errors.credential.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                })}
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border dark:bg-gray-800 dark:text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
              <div className="w-full text-end p-1">
                <button className="text-blue-500 hover:underline hover:text-blue-700 text-sm" onClick={handleForgotPassword}>Forgot Password?</button>
              </div>
            </div>

            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Logging in..." : "Log in"}
              className="w-full p-3 bg-[#EE2B69] text-white font-bold text-lg rounded-xl border-2 border-black hover:opacity-90 cursor-pointer mt-8"
            />
          </form>

          <button
            className="text-blue-500 hover:underline hover:text-blue-700 text-center text-sm mt-2"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
