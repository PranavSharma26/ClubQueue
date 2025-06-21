import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { images } from "../../functions/functions.js";
import { useClubAuth } from "../../context/ClubContext.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { backendURL } from "../../utils/getBackendURL.js";

export const EditCard = ({ event,onClose }) => {
  const imageOption = images;
  const { club, fetchClubEvents } = useClubAuth();
  const [showImageOptions, setShowImageOptions] = useState(false);
  const oldName=event.name
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const finalData = {
        oldName: oldName, 
        ...data, 
        club: club.username,
      };
      const response = await axios.put(
        `${backendURL}/api/event/editEvent`,
        finalData
      );
      await fetchClubEvents(club.username)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event Updated Successfully",
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 1000,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.error,
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

	useEffect(()=>{
		if(event){
			setValue("name", event.name);
    setValue("description", event.description);
    setValue("imgPath", event.imgPath);
    setValue("eventDate", event.eventDate.slice(0, 16));
    setValue("maxParticipants", event.maxParticipants);
    setValue("location", event.location);
    setValue("registrationLink", event.registrationLink);
		}
	},[event,setValue])

  const handleImageShow = () => {
    setShowImageOptions(true);
  };

  const handleSelectImage = (imgPath) => {
    setValue("imgPath", imgPath, { shouldValidate: true });
    setShowImageOptions(false);
  };

  return (
    <div className="flex items-center justify-center px-2 min-h-screen">
    <div className="relative border-2 rounded-xl flex flex-col p-5 w-screen max-w-lg md:w-[800px] px-4 sm:px-10 shadow-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 max-h-[90vh]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none"
        aria-label="Close form"
      >
        &times;
      </button>

      <div className="flex mb-4 justify-center">
        <p className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">Edit</p>
        <p className="text-2xl sm:text-4xl font-extrabold ml-2 text-[#EE2B69]">Event</p>
      </div>

      <div
        className="overflow-y-auto pr-2 border-t border-gray-300 dark:border-gray-700 pt-2"
        style={{ maxHeight: "calc(90vh - 100px)" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 sm:gap-5 pb-4"
        >
          <input
            {...register("name", { required: "Event name is required" })}
            type="text"
            placeholder="Event Name"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Event Description"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <input
            {...register("imgPath", {
              required: "Image is Required",
            })}
            type="hidden"
          />
          <div
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-start text-gray-500 dark:text-gray-400 hover:cursor-pointer"
            onClick={handleImageShow}
          >
            {watch("imgPath") ? (
              <img src={watch("imgPath")} className="h-20" alt="Selected event" />
            ) : (
              "Choose Image"
            )}
          </div>
          {errors.imgPath && (
            <p className="text-red-500">{errors.imgPath.message}</p>
          )}

          <input
            {...register("eventDate", { required: "Date & time required" })}
            type="datetime-local"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.eventDate && (
            <p className="text-red-500">{errors.eventDate.message}</p>
          )}

          <input
            {...register("maxParticipants", {
              required: "Max participants required",
              valueAsNumber: true,
              validate: (value) =>
                value > 0 || "Atleast 1 Participant required",
            })}
            type="number"
            placeholder="Max Participants"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.maxParticipants && (
            <p className="text-red-500">{errors.maxParticipants.message}</p>
          )}

          <input
            {...register("location", { required: "Location is required" })}
            type="text"
            placeholder="Event Location"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}

          <input
            {...register("registrationLink", {
              required: "Registration link is required",
            })}
            type="text"
            placeholder="Registration Link"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.registrationLink && (
            <p className="text-red-500">{errors.registrationLink.message}</p>
          )}

          <input
            type="submit"
            disabled={isSubmitting}
            value="Edit Event"
            className={`w-full p-3 bg-[#EE2B69] rounded-3xl px-6 text-xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white cursor-pointer mt-2 ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:opacity-85"
            }`}
          />

          {showImageOptions && (
            <div
              className="fixed w-screen h-screen inset-0 z-50 flex backdrop-blur-lg justify-center items-center bg-white/20 dark:bg-black/30"
              onClick={() => setShowImageOptions(false)}
            >
              <div
                className="border border-gray-300 dark:border-gray-700 p-2 flex flex-wrap gap-2 bg-white dark:bg-gray-800 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                {imageOption.map((img) => (
                  <div
                    key={img.id}
                    className="w-20 border border-gray-300 dark:border-gray-700 p-2 hover:scale-110 duration-200 rounded cursor-pointer"
                    onClick={() => handleSelectImage(img.src)}
                  >
                    <img src={img.src} alt="Option" className="rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
  );
};
