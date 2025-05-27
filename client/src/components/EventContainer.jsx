import React, { useState } from "react";
import { Card } from "./Card";
import { useClubAuth } from "../context/ClubContext";

export const EventContainer = () => {
  const { club } = useClubAuth();
  const isClub = !!club;
	const [showForm, setShowForm]=useState(false);

  const handlePost = () => {
		setShowForm(true);
		
	};

  return (
    <div className="flex flex-col p-5 lg:px-10 gap-5">
      <div className="font-bold text-xl tracking-wide font-stretch-110% flex justify-between items-center">
        <p>All Events</p>
        {isClub && (
          <button
            className="bg-black text-white px-4 p-2 rounded-xl hover:bg-yellow-400"
            onClick={handlePost}
          >
            Post Event
          </button>
        )}
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
