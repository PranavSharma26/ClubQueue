import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { fetchTime, dateTimeFormat } from '../functions/functions.js'

export const DetailedCard = ({ event, onClose }) => {
  return (
    <div className="relative px-6 py-5 rounded-xl bg-white shadow-2xl flex flex-col gap-5 w-screen sm:max-w-xl max-h-[90vh] overflow-y-auto">
      
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-2xl font-bold">{event.name}</h2>
        <button
          className="text-xl text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <div className="text-sm text-gray-500 italic -mt-3">
        Posted by: <span className="font-medium text-gray-700">{event.club}</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">About the Event:</p>
        <p className="text-sm text-gray-700">
          {event.description}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Maximum Participants:</p>
        <p className="text-sm text-gray-700">{event.maxParticipants}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Registration Link:</p>
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate text-sm"
        >
          {event.registrationLink}
        </a>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <LocationOnOutlinedIcon />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <CalendarMonthOutlinedIcon />
          <span>{dateTimeFormat(event.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <AccessTimeOutlinedIcon />
          <span>{fetchTime(event.eventDate)}</span>
        </div>
      </div>
    </div>
  );
};
