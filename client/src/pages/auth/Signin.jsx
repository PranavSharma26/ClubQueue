import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../context/UserContext";
import { useClubAuth } from "../../context/ClubContext";

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

  const onSubmit = async (data) => {
    try {
      const endpoint = isUser
        ? "http://localhost:3000/api/signin/user"
        : "http://localhost:3000/api/signin/club";
      const response = await axios.post(endpoint, data, {
        withCredentials: true,
      });
      console.log("Successful");

      const meResponse = await axios.get("http://localhost:3000/api/me", {
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
      <div className="flex flex-col justify-center items-center py-10 min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
        <div className="flex mb-8 shadow-md rounded-xl overflow-hidden border border-black">
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

        <div className="w-full max-w-md sm:max-w-xl bg-white border-2 border-gray-300 rounded-3xl shadow-2xl px-6 py-10 flex flex-col items-center gap-10">
          <div className="flex justify-center text-4xl sm:text-5xl font-extrabold">
            <p className="text-amber-400 mr-2">{isUser ? "User" : "Club"}</p>
            <p>Log</p>
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
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Logging in..." : "Log in"}
              className="w-full p-3 bg-[#EE2B69] text-white font-bold text-lg rounded-xl border-2 border-black hover:opacity-90 cursor-pointer"
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
