import React, { useEffect, useState } from "react";
import { Card } from "./card/Card";
import { useClubAuth } from "../context/ClubContext";
import { EventForm } from "./EventForm";
import { DetailedCard } from "./card/DetailedCard";
import { useEventAuth } from "../context/EventContext";
import { useSearchAuth } from "../context/searchContext";

export const EventContainer = () => {
  const { club } = useClubAuth();
  const isClub = !!club;
  const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { event, fetchEvents } = useEventAuth();
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [searchEvent, setSearchEvent] = useState([]);
  const { search } = useSearchAuth();

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

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setSearchEvent(event);
  }, [event]);

  useEffect(() => {
    const filter = event.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.club.toLowerCase().includes(search.toLowerCase())
    );
    setSearchEvent(filter);
  }, [search]);

  return (
    <div className="flex flex-col p-5 pb-10 lg:px-10 gap-5 bg-gradient-to-br from-pink-100 to-yellow-50 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 transition-colors duration-300">
      <div className="font-bold text-xl tracking-wide font-stretch-110% flex justify-between items-center text-black dark:text-gray-200">
        <p>All Events</p>
        {isClub && (
          <button
            className="bg-black text-white px-4 p-2 rounded-xl hover:bg-yellow-400 hover:cursor-pointer dark:bg-gray-200 dark:text-black dark:hover:bg-yellow-400"
            onClick={handleShowForm}
          >
            Post Event
          </button>
        )}
      </div>

      {searchEvent?.length > 0 ? (
        <div
          className="grid gap-5 justify-start"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            maxWidth: "100%",
          }}
        >
          {searchEvent.map((e) => (
            <div
              key={e.id || `${e.name}-${e.club}`}
              className="w-full max-w-[240px] hover:scale-103 transition-transform"
              onClick={() => handleShowCard(e)}
            >
              <Card event={e} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-black dark:text-gray-300">No Events</div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 flex w-screen h-screen justify-center z-50 items-center backdrop-blur-lg bg-black/10 dark:bg-black/30"
          onClick={handleCloseForm}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EventForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
      {showCard && (
        <div
          className="fixed inset-0 flex w-screen h-screen justify-center items-center z-50 backdrop-blur-lg bg-black/10 dark:bg-black/30"
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
