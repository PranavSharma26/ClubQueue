import React, { useState } from "react";
import { Card } from "./card/Card";
import { useClubAuth } from "../context/ClubContext";
import { EventForm } from "./EventForm";
import { DetailedCard } from "./card/DetailedCard";
import { useEventAuth } from "../context/EventContext";

export const EventContainer = () => {
  const { club } = useClubAuth();
  const isClub = !!club;
  const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { event } = useEventAuth();
  const [selectedEvent, setSelectedEvent] = useState([]);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleShowCard = (e) => {
    setSelectedEvent(e);
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

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

      {event.length > 0 ? (
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {event.map((e) => (
            <div
              key={e.name}
              className="w-full max-w-[500px]"
              onClick={() => handleShowCard(e)}
            >
              <Card event={e} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          No Events
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 flex w-screen h-screen justify-center z-50 items-center backdrop-blur-lg bg-black/10"
          onClick={handleCloseForm}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EventForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
      {showCard && (
        <div
          className="fixed inset-0 flex w-screen h-screen justify-center items-center z-50 backdrop-blur-lg bg-black/10"
          onClick={handleCloseCard}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DetailedCard event={selectedEvent} onClose={handleCloseCard} />
          </div>
        </div>
      )}
    </div>
  );
};
