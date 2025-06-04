import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/UserContext";
import axios from "axios";
import { fetchDate } from "../../functions/functions";

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
        url: `http://localhost:3000${url}`,
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
    <div className="p-4 w-full flex flex-col border-[1.5px] rounded-lg gap-3 shadow-xl bg-white">
      <div className="flex justify-between">
        <p className="tracking-wide text-lg font-semibold truncate w-full">
          {event.name}
        </p>
        {user && (
          <div onClick={toggleLike} className="cursor-pointer">
            {isLiked ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
        )}
      </div>

      <div className="relative w-full aspect-square bg-gray-200 rounded-md overflow-hidden">
        {event.imgPath ? (
          <img
            src={event.imgPath}
            alt="Event"
            className="absolute top-0 left-0 w-full h-full object-fill"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <InsertPhotoOutlinedIcon />
          </div>
        )}
      </div>

      <p className="text-sm h-10 text-gray-700 line-clamp-2">
        {event.description}
      </p>

      <div className="w-full flex justify-between text-[18px] text-gray-600">
        <p className="truncate max-w-[50%]">{event.club}</p>
        <div className="flex items-center">
          <CalendarMonthIcon />
          <p className="truncate text-right">{fetchDate(event.eventDate)}</p>
        </div>
      </div>
    </div>
  );
};
