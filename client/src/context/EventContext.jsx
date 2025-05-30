import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState([]);
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
	useEffect(()=>{
    const fetchEvents= async()=>{
			try {
				const res = await axios.get('http://localhost:3000/api/postEvent')
				setEvent(res.data)
			} catch (error) {
				console.log("Error Fetching Events", error)
				setEvent(null)
			}
		}
		fetchEvents();
	},[])
  return (
    <EventContext.Provider value={{ event, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventAuth = () => useContext(EventContext);
