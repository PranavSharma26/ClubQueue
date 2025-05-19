import React from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate()
	const handleUserLogin = () => {
		navigate('/signin/user')
	}
	const handleClubLogin = () => {
		navigate('/signin/club')
	}
	return (
    <>
      <div className="w-full bg-primary h-screen flex flex-col sm:flex-row justify-center items-center py-10 bg-[#EE2B69] gap-10 px-6"
      style={{
        backgroundImage: `linear-gradient(
          to right,
          transparent 49.5%,
          rgba(251, 232, 67, 0.2) 49.5%,
          rgba(251, 232, 67, 0.6) 50.5%,
          transparent 50.5%
        )`,
        backgroundSize: "5% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}>
				<button className="border-3 h-56 flex justify-center items-center p-9 rounded-xl shadow-2xl bg-white text-3xl sm:text-4xl
				md:text-6xl  tracking-wide hover:bg-gray-200" onClick={handleUserLogin}>
					<p>Login as User</p>
				</button>
				<button className="border-3 h-56 flex justify-center items-center p-9 rounded-xl shadow-2xl bg-white text-3xl sm:text-4xl md:text-6xl tracking-wide hover:bg-gray-200" onClick={handleClubLogin}>
					<p>Login as Club</p>
				</button>
			</div>
    </>
  );
};
