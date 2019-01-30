window.addEventListener("load", () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  if (!token) {
    window.location.href = "signin.html";
  }
  const url = "https://questioner-app-api.herokuapp.com/api/v1/meetups";
  const bearer = `Bearer '${token}`;

  fetch(url, {
    method: "GET",
    headers: {
      authorization: bearer
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      let output = "";
      response.data.forEach(element => {
        output += `<div class="card meetup-menu-item">
              <img src=${element.images[0]} />
              <p class="meetup"> ${element.topic}</p>
              <p class="meetup">
              <i class="fas fa-map-marker-alt"></i> ${element.location}
              </p>
              <p class="meetup"><i class="fas fa-calendar-alt"></i> ${moment(
                element.happeningon
              ).format("MMMM Do YYYY, h:mm:ss a")}</p>
              <button class="btn btn-default"><a href="signin.html">view</a></button>
              </div>`;
        const meetupContainer = document.getElementById("meetups");
        meetupContainer.innerHTML = output;
      });
    });
});
