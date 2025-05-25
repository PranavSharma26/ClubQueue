import React, { useState, useRef } from "react";

export const Verification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

	const handleSubmit=()=>{
		console.log(otp)
	}

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

        <button onClick={handleSubmit} className="w-80 p-3 bg-[#EE2B69] rounded-3xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white">
          Verify
        </button>

        <button className="text-blue-400 hover:text-blue-600">
          Resend Code
        </button>
      </div>
    </div>
  );
};
