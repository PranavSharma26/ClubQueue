import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
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
        ? "http://localhost:3000/api/signup/user"
        : "http://localhost:3000/api/signup/club";

      const response = await axios.post(endpoint, isUser ? userData : clubData);
      console.log("Successfull");

      if(response.status>=400){
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

      const expiryTime = Date.now() + 10 * 60 * 1000
      if(isUser){
        localStorage.setItem("user",JSON.stringify({data:userData, expiresAt:expiryTime}))
      }
      else{
        localStorage.setItem("club",JSON.stringify({data:clubData, expiresAt:expiryTime}))
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
        title: error.response?.data?.error || 
        error.response?.data?.message || 'Something went wrong',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const handleToggle = () => setIsUser(!isUser);

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

      <div className="flex items-center justify-center px-2">
        <div className="border-2 rounded-xl flex flex-col gap-10 p-5 w-screen sm:w-120 items-center px-10 shadow-xl">
          <div className="flex">
            <p className="text-5xl font-extrabold mr-2 text-amber-300">
              {isUser ? "User" : "Club"}
            </p>
            <p className="text-5xl font-extrabold">Sign</p>
            <p className="text-5xl text-[#EE2B69] font-extrabold">up</p>
          </div>

          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
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
                className="w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="w-full">
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
                className="w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {!isUser ? (
              <>
                <div className="w-full px-1">
                  <textarea
                    {...register("bio", {
                      maxLength: {
                        value: 200,
                        message: "Maximum 200 characters allowed",
                      },
                    })}
                    className="border-1 text-xl w-full p-1 px-4 rounded-2xl bg-gray-100"
                    placeholder="Enter Club Bio"
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <input
                    {...register("firstName", {
                      maxLength: 20,
                    })}
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    {...register("lastName", {
                      maxLength: 20,
                    })}
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="w-full">
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 bg-gray-100 rounded-3xl px-6 text-xl border-2 border-gray-500"
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
              className="w-full p-3 bg-[#EE2B69] rounded-3xl px-6 text-xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white cursor-pointer mt-2"
            />
          </form>

          <button
            className="text-blue-400 hover:text-blue-600"
            onClick={() => navigate("/signin")}
          >
            Already have an Account? Login
          </button>
        </div>
      </div>
    </>
  );
};
