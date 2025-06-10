import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { fetchTime, fetchDate } from '../../functions/functions.js';

export const DetailedCard = ({ event, onClose }) => {
  return (
    <div className="relative px-6 py-5 rounded-xl bg-white dark:bg-[#1f1f1f] shadow-2xl flex flex-col gap-5 w-screen sm:max-w-xl max-h-[90vh] overflow-y-auto border dark:border-gray-700">
      
      <div className="flex justify-between items-center border-b pb-3 border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-black dark:text-white">{event.name}</h2>
        <button
          className="text-xl text-gray-500 hover:text-red-500 transition dark:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <div className="text-sm text-gray-500 italic -mt-3 dark:text-gray-400">
        Posted by: <span className="font-medium text-gray-700 dark:text-gray-200">{event.club}</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-black dark:text-white">About the Event:</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {event.description}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-black dark:text-white">Maximum Participants:</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{event.maxParticipants}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-black dark:text-white">Registration Link:</p>
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate text-sm dark:text-blue-400"
        >
          {event.registrationLink}
        </a>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
          <LocationOnOutlinedIcon />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
          <CalendarMonthOutlinedIcon />
          <span>{fetchDate(event.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
          <AccessTimeOutlinedIcon />
          <span>{fetchTime(event.eventDate)}</span>
        </div>
      </div>
    </div>
  );
};
