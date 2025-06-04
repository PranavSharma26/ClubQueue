import axios from 'axios'

for(let i=1; i<=5; i++){
    const finalData = {
        "name":`abcd${i}`,
        "description":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ab ad error ipsa, reprehenderit laudantium sed voluptas animi ex distinctio magni possimus iusto deserunt quisquam ut ipsam non porro iste",
        "imgPath":"/imageOptions/competition.png",
        "eventDate":"2025-06-04T15:16",
        "maxParticipants": 100,
        "location":"Testing Department",
        "registrationLink":"testRegitrationlink",
        "club":"include"
      }
    const response = await axios.post(
        "http://localhost:3000/api/event/postEvent",
        finalData
    );
}