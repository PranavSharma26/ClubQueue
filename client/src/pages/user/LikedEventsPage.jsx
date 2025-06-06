import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../context/UserContext'
import { Card } from '../../components/card/Card'
import { useEventAuth } from '../../context/EventContext'
import { DetailedCard } from '../../components/card/DetailedCard'

export const LikedEventsPage = () => {
  const {likedEvents} = useAuth()
  const {event, fetchEvents} = useEventAuth()
  const [filteredEvents, setFilteredEvents] = useState([])
  const [showCard, setShowCard] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState([])

  const handleShowCard=(e)=>{
    setSelectedEvent(e)
    setShowCard(true)
  }
  const handleCloseCard=(e)=>{
    setShowCard(false)
  }

  useEffect(() => {
    fetchEvents();
  }, []);
  
  useEffect(() => {
    if (event && likedEvents) {
      const likedIds = likedEvents.map(e => e);
      const filtered = event.filter(e => likedIds.includes(e.id));
      setFilteredEvents(filtered);
    }
  }, [event, likedEvents]);
  

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">❤️ Liked Events</h1>
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-200 cursor-pointer p-4 transform hover:scale-[1.02]"
                onClick={() => handleShowCard(e)}
              >
                <Card event={e} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 text-lg mt-32">
            No liked events found.
          </div>
        )}
      </main>

      {showCard && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30"
          onClick={handleCloseCard}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full p-4"
          >
            <DetailedCard event={selectedEvent} onClose={handleCloseCard} />
          </div>
        </div>
      )}
    </>
  )
}
