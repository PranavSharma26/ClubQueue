import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
export const UserSignin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/signin/user',data)
      console.log('Successful')
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Log In Successfully",
        timerProgressBar:true,
        showConfirmButton: false,
        timer: 1000
      });
    } catch (err) {
      console.log("Error Logging in",err.response.data.error)
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.error,
        timerProgressBar:true,
        showConfirmButton: false,
        timer: 1000
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-2 mt-10 sm:mt-20">
      <div className="border-2 rounded-xl flex flex-col gap-10 p-5 w-screen sm:w-120 items-center px-10 shadow-xl">
        <div className="flex">
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
                placeholder="Enter Username or Email"
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
              value={isSubmitting?"Loging in..":"Log in"}
              className="w-full p-3 bg-[#EE2B69] rounded-3xl px-6 text-xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white"
            />
          </form>
        </div>
        <button
          className="text-blue-400 hover:text-blue-600"
          onClick={() => navigate("/signup/user")}
        >
          Don't have an Account? Sign Up
        </button>
      </div>
    </div>
  );
};
