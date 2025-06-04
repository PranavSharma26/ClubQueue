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
  const [searchEvent, setSearchEvent] = useState([])
  const {search} = useSearchAuth()

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
  
  useEffect(()=>{
    fetchEvents()
  },[])

  useEffect(()=>{
    setSearchEvent(event)
  },[event])

  useEffect(()=>{
    const filter = event.filter( s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.club.toLowerCase().includes(search.toLowerCase())
    )
    setSearchEvent(filter)
  },[search])


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
        key={e.id}
        className="w-full max-w-[240px]"
        onClick={() => handleShowCard(e)}
      >
        <Card event={e} />
      </div>
    ))}
  </div>
) : (
  <div>No Events</div>
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
