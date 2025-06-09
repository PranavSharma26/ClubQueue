import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { backendURL } from "../../utils/getBackendURL";

export const ChangePassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const userData = JSON.parse(localStorage.getItem("data"))
  const isUser = userData?.data?.role==="user"? true: false

  const onSubmit = async (data) => {

    const res = await axios.put(`${backendURL}/api/changePassword`,{
      email: userData?.data?.email,
      newPassword: data.newPassword,
      role: userData?.data?.role
    })
    if(res.status>=400){
      Swal.fire({
        icon: "error",
        title: "Error changing password",
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }
    localStorage.removeItem("data")
    Swal.fire({
      icon: "success",
      title: "Password changed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/signin')
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-300">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
          Change <span className="text-[#EE2B69]">Password</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters"
                }
              })}
              className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-[#EE2B69] text-white font-bold text-lg rounded-xl border-2 border-black hover:opacity-90 cursor-pointer mt-4"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
