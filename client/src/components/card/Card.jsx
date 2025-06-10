import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/UserContext";
import axios from "axios";
import { fetchDate } from "../../functions/functions";
import { backendURL } from "../../utils/getBackendURL";

export const Card = ({ event }) => {
  const { user, likedEvents, setLikedEvents } = useAuth();
  const isLiked = likedEvents.includes(event.id);

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!user) return alert("Please login first");

    const url = isLiked ? "/api/user/unlike" : "/api/user/like";
    const method = isLiked ? "delete" : "post";

    try {
      await axios({
        method,
        url: `${backendURL}${url}`,
        data: { user_id: user.id, event_id: event.id },
        withCredentials: true,
      });

      setLikedEvents((prev) =>
        isLiked ? prev.filter((id) => id !== event.id) : [...prev, event.id]
      );
    } catch (err) {
      console.error("Toggle like error:", err);
    }
  };

  return (
    <div className="p-4 w-full flex flex-col border-[1.5px] rounded-lg gap-3 shadow-xl bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between">
        <p className="tracking-wide text-lg font-semibold truncate w-full text-black dark:text-white">
          {event.name}
        </p>
        {user && (
          <div onClick={toggleLike} className="cursor-pointer">
            {isLiked ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-black dark:text-white" />
            )}
          </div>
        )}
      </div>

      <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-500 rounded-md overflow-hidden">
        {event.imgPath ? (
          <img
            src={event.imgPath}
            alt="Event"
            className="absolute top-0 left-0 w-full h-full object-fill"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full text-black dark:text-white">
            <InsertPhotoOutlinedIcon />
          </div>
        )}
      </div>

      <p className="text-sm h-10 text-gray-700 dark:text-gray-300 line-clamp-2">
        {event.description}
      </p>

      <div className="w-full flex justify-between text-[15px] text-gray-600 dark:text-gray-400">
        <p className="truncate max-w-[50%]">{event.club}</p>
        <div className="flex items-center gap-1">
          <CalendarMonthIcon fontSize="small" />
          <p className="truncate text-right">{fetchDate(event.eventDate)}</p>
        </div>
      </div>
    </div>
  );
};
