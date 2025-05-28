import React, { useState } from "react";
import { Card } from "./Card";
import { useClubAuth } from "../context/ClubContext";
import { EventForm } from "./EventForm";
import { DetailedCard } from "./DetailedCard";

export const EventContainer = () => {
  const { club } = useClubAuth();
  const isClub = !!club;
	const [showForm, setShowForm]=useState(false);
  const [showCard, setShowCard] = useState(false)

  const handleShowForm = () => {
		setShowForm(true);
	};
  const handleCloseForm = () => {
		setShowForm(false);
	};

  const handleShowCard=()=>{
    setShowCard(true);
  }
  
  const handleCloseCard=()=>{
    setShowCard(false);
  }

  return (
    <div className="flex flex-col p-5 lg:px-10 gap-5">
      <div className="font-bold text-xl tracking-wide font-stretch-110% flex justify-between items-center">
        <p>All Events</p>
        {isClub && (
          <button
            className="bg-black text-white px-4 p-2 rounded-xl hover:bg-yellow-400"
            onClick={handleShowForm}
          >
            Post Event
          </button>
        )}
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <div onClick={handleShowCard}>
          <Card />
        </div>
        <div onClick={handleShowCard}>
          <Card />
        </div>
        <div onClick={handleShowCard}>
          <Card />
        </div>
        <div onClick={handleShowCard}>
          <Card />
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex w-screen h-screen justify-center z-50 items-center backdrop-blur-lg bg-black/10" onClick={handleCloseForm}>
          <div onClick={(e)=>e.stopPropagation()}>
            <EventForm onClose={handleCloseForm}/>
          </div>
        </div>
      ) }
      {showCard && (
        <div className="fixed inset-0 flex w-screen h-screen justify-center items-center z-50 backdrop-blur-lg bg-black/10" onClick={handleCloseCard}>
          <div onClick={(e)=>e.stopPropagation()}>
            <DetailedCard onClose={handleCloseCard}/>
          </div>
        </div>
      )}
    </div>
  );
};
