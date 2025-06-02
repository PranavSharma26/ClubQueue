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
  const {loginUser} = useAuth()
  const {loginClub} = useClubAuth()
  const handleToggle = () => {
    setIsUser(!isUser);
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = isUser
        ? "http://localhost:3000/api/signin/user"
        : "http://localhost:3000/api/signin/club";
      const response = await axios.post(endpoint, data,{withCredentials: true});
      console.log("Successful");

      const meResponse = await axios.get('http://localhost:3000/api/me',{withCredentials: true})

      if(meResponse.data.role==="user") loginUser(meResponse.data.data);
      else if(meResponse.data.role==="club") await loginClub(meResponse.data.data);

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
      console.log("Error Logging in",error.response.data.error)
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
      <div className="flex p-3 justify-center items-center rounded-lg ">
        <button
          className={`border-black border-1 p-2 px-4 rounded-l-xl text-4xl ${
            isUser ? "bg-amber-300" : "bg-gray-200 hover:bg-amber-200"
          }`}
          onClick={handleToggle}
        >
          User
        </button>
        <button
          className={`border-black border-1 px-4 p-2 text-4xl rounded-r-xl ${
            isUser ? "hover:bg-amber-200" : "bg-amber-300"
          }`}
          onClick={handleToggle}
        >
          Club
        </button>
      </div>
      <div className="flex items-center justify-center p-2 mt-5 sm:mt-10">
        <div className="border-2 rounded-xl flex flex-col gap-10 p-5 w-screen sm:w-120 items-center px-10 shadow-xl">
          <div className="flex">
            <p className="text-5xl font-extrabold mr-2 text-amber-300">
              {isUser ? "User" : "Club"}
            </p>
            <p className="text-5xl font-extrabold">Log</p>
            <p className="text-5xl text-[#EE2B69] font-extrabold">in</p>
          </div>
          <div className="w-full">
            <form
              action=""
              className="flex flex-col items-start gap-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <input
                  {...register("credential", {
                    required: {
                      value: true,
                      message: "Username or Email is Required",
                    },
                  })}
                  type="text"
                  placeholder={`Enter ${isUser ? "User" : "Club"}name or Email`}
                  className="
              w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
                />
                {errors.credential && (
                  <p className="text-sm ml-4 text-red-500 mt-1">
                    {errors.credential.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                  })}
                  type="password"
                  placeholder="Enter Password"
                  className="
              w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
                />
                {errors.password && (
                  <p className="text-sm ml-4 text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <input
                type="submit"
                disabled={isSubmitting}
                value={isSubmitting ? "Loging in.." : "Log in"}
                className="w-full p-3 bg-[#EE2B69] rounded-3xl px-6 text-xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white"
              />
            </form>
          </div>
          <button
            className="text-blue-400 hover:text-blue-600"
            onClick={() => navigate("/signup")}
          >
            Don't have an Account? Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
