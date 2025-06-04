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
    if (event && likedEvents) {
      const likedIds = likedEvents.map(e => e);
      const filtered = event.filter(e => likedIds.includes(e.id));
      setFilteredEvents(filtered);
    }
  }, [event,likedEvents]);
  

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredEvents.map((e) => (
              <div key={e.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-100 p-4" onClick={()=>handleShowCard(e)}>
                <Card event={e} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-20">
            No Events
          </div>
        )}
      </main>
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
    </>
  )
}
