import axios from "axios";

for (let i = 0; i < 10; i++) {
    const response = await axios.post("http://localhost:3000/api/postEvent", {
      name: "testt " + `${i}`,
      description: "abc",
      imgPath: "/imageOptions/competition.png",
      eventDate: "2025-06-27T15:21",
      maxParticipants: 234,
      location: "abc",
      registrationLink: "vfg",
      club: "CodeFoster",
    });
}
