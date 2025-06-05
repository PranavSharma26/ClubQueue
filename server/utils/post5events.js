import axios from 'axios'

for(let i=1; i<=5; i++){
    const finalData = {
        "name":`Design Dazzle ${i}.0`,
        "description":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ab ad error ipsa, reprehenderit laudantium sed voluptas animi ex distinctio magni possimus iusto deserunt quisquam ut ipsam non porro iste",
        "imgPath":"/imageOptions/education.png",
        "eventDate":"2025-06-05T16:30",
        "maxParticipants": 200,
        "location":"LT-201",
        "registrationLink":"testRegitrationlink",
        "club":"include"
      }
    const response = await axios.post(
        "http://localhost:3000/api/event/postEvent",
        finalData
    );
}