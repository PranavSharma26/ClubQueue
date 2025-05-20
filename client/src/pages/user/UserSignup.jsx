import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
export const UserSignup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/signup/user',data)
      console.log("Successfull")
      navigate('/')
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sign Up Successful",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
      });
      
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-2 mt-5 sm:mt-10">
      <div className="border-2 rounded-xl flex flex-col gap-10 p-5 w-screen sm:w-120 items-center px-10 shadow-xl">
        <div className="flex">
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
                required: "Username is required",
                minLength:{
                  value: 3,
                  message: "Minimum 3 characters are required"
                },
                maxLength:{
                  value: 20,
                  message: "Maximum 20 characters allowed"
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Only letters, numbers, and underscores are allowed"
                }
              })}
              type="text"
              placeholder="Enter Username"
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
          onClick={() => navigate("/signin/user")}
        >
          Already have an Account? Login
        </button>
      </div>
    </div>
  );
};
