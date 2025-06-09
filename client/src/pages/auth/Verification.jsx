import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../../utils/getBackendURL";

export const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [correctOtp, setCorrectOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const inputsRef = useRef([]);
  const didSendEmail = useRef(false);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === correctOtp) {
      Swal.fire({
        icon: "success",
        title: "Sign Up Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      const isUser = !!localStorage.getItem("user");
      const user = JSON.parse(localStorage.getItem(isUser ? "user" : "club"));
      user.data.isVerified = true;

      const endpoint = isUser
        ? `${backendURL}/api/signup/user`
        : `${backendURL}/api/signup/club`;

      await axios.post(endpoint, user.data);
      console.log("Successfully verified");
      localStorage.removeItem(isUser ? "user" : "club");
      navigate("/signin");
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect OTP",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const sendOtpEmail = async () => {
    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setCorrectOtp(generatedOtp);
      const userData = JSON.parse(
        localStorage.getItem("user") || localStorage.getItem("club")
      );
      const userEmail = userData?.data?.email;

      await axios.post(`${backendURL}/api/verify/send-otp`, {
        email: userEmail,
        otp: generatedOtp,
        mode: 1
      });

      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 30000); 

      Swal.fire({
        icon: "success",
        title: "OTP sent",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleResend = () => {
    sendOtpEmail();
  };

  useEffect(() => {
    if (didSendEmail.current) return;
    didSendEmail.current = true;
    sendOtpEmail();
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 px-4 py-10">
  <div className="w-full max-w-md bg-white border-2 border-gray-300 rounded-3xl shadow-2xl px-8 py-10 flex flex-col gap-8 items-center">
    
    {/* Title */}
    <div className="text-4xl sm:text-5xl font-extrabold text-center">
      <p className="inline">Verify</p>
      <p className="inline text-[#EE2B69]">&nbsp;Email</p>
    </div>

    {/* Description */}
    <p className="text-gray-600 text-center text-sm sm:text-base px-2">
      Enter the 6-digit code sent to your email address
    </p>

    {/* OTP Inputs */}
    <div className="flex justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-400 rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#EE2B69] transition"
        />
      ))}
    </div>

    {/* Verify Button */}
    <button
      onClick={handleSubmit}
      className="w-full sm:w-80 p-3 bg-[#EE2B69] text-white font-bold text-lg rounded-2xl border-2 border-black hover:opacity-90 transition"
    >
      Verify
    </button>

    {/* Resend Button */}
    <button
      className="text-blue-500 hover:underline hover:text-blue-700 text-sm disabled:opacity-50"
      onClick={handleResend}
      disabled={resendDisabled}
    >
      Resend Code
    </button>
  </div>
</div>

  );
};
