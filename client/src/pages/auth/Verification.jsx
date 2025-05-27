import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
        ? "http://localhost:3000/api/signup/user"
        : "http://localhost:3000/api/signup/club";

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

      await axios.post("http://localhost:3000/api/verify/send-otp", {
        email: userEmail,
        otp: generatedOtp,
      });

      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 30000); // 30s cooldown

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
    <div className="flex items-center justify-center p-2 mt-5 sm:mt-10">
      <div className="border-2 rounded-xl flex flex-col gap-10 p-5 w-full sm:w-[30rem] items-center px-10 shadow-xl bg-white">
        <div className="flex text-5xl font-extrabold">
          <p>Verify</p>
          <p className="text-[#EE2B69]">&nbsp;Email</p>
        </div>

        <p className="text-gray-600 text-center">
          Enter the 6-digit code sent to your email address
        </p>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="border h-12 w-12 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-[#EE2B69]"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-80 p-3 bg-[#EE2B69] rounded-3xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white"
        >
          Verify
        </button>

        <button
          className={`text-blue-400 hover:text-blue-600 disabled:opacity-50`}
          onClick={handleResend}
          disabled={resendDisabled}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};
