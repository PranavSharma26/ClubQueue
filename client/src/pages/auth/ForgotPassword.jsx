import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { backendURL } from "../../utils/getBackendURL";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);
  const [generateOTP, setGenerateOTP] = useState("");
  const [enterOTP, setEnterOTP] = useState(false);
  const handleToggle = () => {
    setIsUser(!isUser);
  };

  const onSubmit = async (data) => {
    try {
      if (!enterOTP) {
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const res = await axios.post(`${backendURL}/api/verify/send-otp`, {
          email: data.email.trim().toLowerCase(),
          otp: OTP,
          mode: isUser ? 21 : 22,
        });
        if (res.status >= 400) {
          Swal.fire({
            icon: "error",
            title: res.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
        Swal.fire({
          icon: "success",
          title: "OTP sent on email",
          showConfirmButton: false,
          timer: 1500,
        });
        setGenerateOTP(OTP);
        setEnterOTP(true);
      } else {
        const o = data.otp;
        if (o === generateOTP) {
          const expiryTime = Date.now() + 10 * 60 * 1000;
          const userData = {
            role: isUser ? "user" : "club",
            email: data.email.trim().toLowerCase(),
          };
          localStorage.removeItem("data");
          localStorage.setItem(
            "data",
            JSON.stringify({
              data: userData,
              expiresAt: expiryTime,
            })
          );
          Swal.fire({
            icon: "success",
            title: "Verification Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/changePassword");
        } else {
          Swal.fire({
            icon: "error",
            title: "Incorrect OTP",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error || error.response?.data?.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-10 min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 from-pink-100 to-yellow-100">
        <div className="flex mb-8 shadow-md rounded-xl overflow-hidden border border-black dark:text-white dark:border-white">
          <button
            className={`px-6 py-2 text-xl sm:text-2xl font-semibold transition ${
              isUser
                ? "bg-amber-300 text-black dark:text-white dark:bg-yellow-500"
                : "bg-gray-200 hover:bg-amber-200 dark:bg-gray-900 dark:hover:bg-gray-950"
            }`}
            onClick={handleToggle}
          >
            User
          </button>
          <button
            className={`px-6 py-2 text-xl sm:text-2xl font-semibold transition ${
              isUser ? "hover:bg-amber-200 dark:hover:bg-gray-950" : "bg-amber-300 text-black dark:text-white dark:bg-yellow-500"
            }`}
            onClick={handleToggle}
          >
            Club
          </button>
        </div>

        <div className="w-full max-w-md sm:max-w-xl bg-white border-2 border-gray-300 rounded-3xl shadow-2xl px-6 py-10 flex flex-col items-center gap-10 dark:bg-gray-900">
          <div className="flex justify-center text-4xl sm:text-5xl font-extrabold">
            <p className="dark:text-white">Forgot</p>
            <p className="text-[#EE2B69] ml-1">Password</p>
          </div>

          <form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                placeholder={`Enter ${isUser ? "User" : "Club"} Email`}
                className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border border-gray-400 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {enterOTP && (
              <>
                <div>
                  <input
                    {...register("otp", {
                      required: {
                        value: true,
                        message: "OTP is Required",
                      },
                    })}
                    type="text"
                    placeholder={`Enter OTP`}
                    className="w-full p-3 px-5 text-lg rounded-xl bg-gray-100 border dark:bg-gray-800 dark:text-white border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                {errors.otp && (
                  <p className="text-sm text-red-500 ml-1">
                    {errors.otp.message}
                  </p>
                )}
              </>
            )}

            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Sending..." : "Submit"}
              className="w-full p-3 bg-[#EE2B69] text-white font-bold text-lg rounded-xl border-2 border-black hover:opacity-90 cursor-pointer mt-8"
            />
          </form>

          <button className="text-blue-500 hover:underline hover:text-blue-700 text-center text-sm mt-2" onClick={()=>navigate('/signup')}>
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
