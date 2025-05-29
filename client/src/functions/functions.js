export const dateTimeFormat = (s) => {
  let date = s.split("T")[0].split("-");
  return date[2] + "-" + date[1] + "-" + date[0];
};

export const fetchTime = (s) => {
  const timePart = s.split("T")[1];
  return timePart.split(".")[0].split(":").slice(0,2).join(":")
}

export const images = [
  {
    id: 1,
    src: "/imageOptions/education.png",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "/imageOptions/competition.png",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "/imageOptions/dancing.png",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "/imageOptions/workshop.png",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "/imageOptions/surprise.png",
    alt: "Image 5",
  },
];
