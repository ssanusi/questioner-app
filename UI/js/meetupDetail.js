const url = "https://questioner-app-api.herokuapp.com/api/v1/meetups/";
const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("username"));
const bearer = `Bearer ${token}`;
const meetupDetail = document.getElementById("meetup-detail");

const getParamUrl = () => {
  const urlString = window.location.search.substring(1);
  const params = urlString.split("=")[1];
  return params;
};

const meetupId = getParamUrl();

window.addEventListener("load", () => {
  fetch(url + meetupId, {
    method: "GET",
    headers: {
      Authorization: bearer
    }
  })
    .then(res => res.json())
    .then(response => {
      meetupDetail.innerHTML = `<div class="meetup-detail">
        <h1><i class="fab fa-meetup"></i> ${response.data[0].topic}</h1>
        <p><i class="fas fa-map-marker-alt"></i> ${response.data[0].location}</p>
        <p><i class="fas fa-calendar-alt"></i> ${moment(response.data[0].happeningon).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}</p>
    </div>
    <img src="${response.data[0].images[0]}" alt="">
    <div class="meetup-rsvp">
          <h1>Are you coming</h1>
          <i class="far fa-calendar-check fa-3x"></i>
          <i class="far fa-calendar-times fa-3x"></i>
      </div>
      <div class="rsvp">
        <h1>confirmed</h1>
        <i class="far fa-check-circle fa-3x"></i>
        <i class="far fa-times-circle fa-3x"></i>
    </div>`;
    });
});
