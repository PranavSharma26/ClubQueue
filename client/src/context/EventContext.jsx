import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState([]);
  const addEvent = (data) => {
    const {
      name,
      club,
      description,
			imgPath,
      maxParticipants,
      registrationLink,
      location,
      date,
    } = data;
    const newEvent = {
      id: Date.now(),
      name,
      club,
      description,
			imgPath,
      maxParticipants,
      registrationLink,
      location,
      date,
    };
		setEvent((prevEvent)=>[...prevEvent,newEvent]);
  };
	useEffect(()=>{
		const fetchEvents= async()=>{
			try {
				const res = await axios.get('http://localhost:3000/api/postEvent',{withCredentials:true})
				setEvent(res.data)
			} catch (error) {
				console.log("Error Fetching Events", err)
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
