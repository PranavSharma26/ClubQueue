import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { backendURL } from "../utils/getBackendURL";
const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState([]);

  const fetchEvents= async()=>{
    try {
      const res = await axios.get(`${backendURL}/api/event/postEvent`)
      setEvent(res.data)
    } catch (error) {
      setEvent([])
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
      const res= await axios.delete(`${backendURL}/api/event/deleteEvent`,{params:{name,club}, withCredentials: true})
      fetchEvents();
      
    } catch (err) {
      console.log("Failed to Delete Event")
    }
  }

  const deleteOldEvents = async () => {
    try {
      const res = await axios.delete(`${backendURL}/api/event/deleteOldEvent`)
    } catch (error) {
      console.log("Failed to Delete Event : ",error)
    }
  }

	useEffect(()=>{
    deleteOldEvents();
		fetchEvents();
	},[])
  return (
    <EventContext.Provider value={{ event, addEvent, deleteEvent, fetchEvents, deleteOldEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventAuth = () => useContext(EventContext);
