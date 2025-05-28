import { images } from "../functions/functions.js";

export const EventForm = ({ onClose }) => {
  const imageOption = images;

  return (
    <div className="flex items-center justify-center px-2 min-h-screen">
      <div className="relative border-2 rounded-xl flex flex-col p-5 w-screen max-w-lg md:w-[800px] px-4 sm:px-10 shadow-xl bg-white max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold focus:outline-none"
          aria-label="Close form"
        >
          &times;
        </button>

        <div className="flex mb-4 justify-center">
          <p className="text-2xl sm:text-4xl font-extrabold">Post</p>
          <p className="text-2xl sm:text-4xl font-extrabold ml-2 text-[#EE2B69]">
            Event
          </p>
        </div>

        <div
          className="overflow-y-auto pr-2 border-t-1 pt-2"
          style={{ maxHeight: "calc(90vh - 100px)" }}
        >
          <form className="w-full flex flex-col gap-4 sm:gap-5 pb-4">
            <input
              name="name"
              type="text"
              placeholder="Event Name"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500"
            />

            <textarea
              name="description"
              placeholder="Event Description"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500 resize-none"
              rows={4}
            />

            <input
              name="image"
              type=""
              placeholder="Image URL"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500"
            />

            <input
              name="eventDate"
              type="datetime-local"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500"
            />

            <input
              name="maxParticipants"
              type="number"
              placeholder="Max Participants"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500"
            />

            <input
              name="location"
              type="text"
              placeholder="Event Location"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500"
            />

            <input
              name="registrationLink"
              type="url"
              placeholder="Registration Link"
              className="w-full p-3 bg-gray-100 rounded-3xl px-4 sm:px-6 text-lg sm:text-xl border-2 border-gray-500"
            />

            <input
              type="submit"
              value="Post Event"
              className="w-full p-3 bg-[#EE2B69] rounded-3xl px-6 text-xl border-2 border-black hover:opacity-85 font-bold tracking-wider text-white cursor-pointer mt-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
