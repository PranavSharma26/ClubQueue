import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState([]);
  
  const fetchEvents= async()=>{
    try {
      const res = await axios.get('http://localhost:3000/api/event/postEvent')
      setEvent(res.data)
    } catch (error) {
      console.log("Error Fetching Events", error)
      setEvent(null)
    }
  }
  
  const addEvent = (data) => {
    const {
      name,
      description,
			imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
      club,
    } = data;
    const newEvent = {
      name:name,
      description: description,
			imgPath: imgPath,
      eventDate: eventDate,
      maxParticipants: maxParticipants,
      location: location,
      registrationLink: registrationLink,
      club: club,
    };
		setEvent((prevEvent)=>[...prevEvent,newEvent]);
  };

  const deleteEvent = async (name,club) => {
    try {
      const res= await axios.delete('http://localhost:3000/api/event/deleteEvent',{params:{name,club}, withCredentials: true})
      fetchEvents();
      
    } catch (err) {
      console.log("Failed to Delete Event")
    }
  }

	useEffect(()=>{
		fetchEvents();
	},[])
  return (
    <EventContext.Provider value={{ event, addEvent, deleteEvent, fetchEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventAuth = () => useContext(EventContext);
