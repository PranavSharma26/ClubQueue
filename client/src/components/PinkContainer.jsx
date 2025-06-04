import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchAuth } from "../context/searchContext";

export const PinkContainer = () => {
  const [value, setValue] = useState("");
  const { updateSearch } = useSearchAuth();
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      updateSearch(value)
    },500)
    return () => {
      clearTimeout(timer)
    }
  },[value])

  return (
    <div
      className="w-full bg-primary min-h-[200px] sm:min-h-[500px] flex justify-center items-center flex-col py-10 bg-[#EE2B69] gap-10 px-6"
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
      }}
    >
      <div className="bg-black p-4 rounded-sm max-w-[900px] text-center">
        <p className="text-white text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
          Discover campus events and club activities effortlessly.
        </p>
      </div>
      <div className="bg-white p-1 rounded-full border-4 flex gap-1 items-center justify-between w-full md:w-[600px]">
        <input
          type="text"
          name="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // updateSearch(e.target.value)
          }}
          placeholder="Explore Events"
          className="focus:outline-none rounded-full text-lg p-2 pl-6 w-full"
        />
        <div
          className="mr-1 p-1 px-1.5 border-2 rounded-full hover:scale-110 hover:cursor-pointer"
          onClick={() => updateSearch(value)}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
