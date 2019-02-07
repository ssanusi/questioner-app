window.addEventListener("load", () => {
  const footerYear = document.getElementById("year");
  const menuDate = document.getElementById("date");
  const toggleShow = document.querySelector(".toggle-show");
  const toggleNavbar = () => {
    const navContainer = document.getElementsByClassName("nav-container")[0];
    navContainer.classList.toggle("navbar-toggle-show");
  };
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("username"));
  if (!token) {
    window.location.href = "signin.html";
  }
  const url = "https://questioner-app-api.herokuapp.com/api/v1/meetups";
  const bearer = `Bearer ${token}`;
  const userLi = document.getElementById("user");
  userLi.textContent = user;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer
    }
  })
    .then(res => res.json())
    .then(response => {
      const spinner = document.getElementById("spinner");
      spinner.style.display = "none";
      let output = "";
      response.data.forEach(element => {
        output += `<div class="card meetup-menu-item">
                      <img src=${element.images[0]} alt="">
                      <p class="meetup">${element.topic}</p>
                      <p class="meetup"><i class="fas fa-map-marker-alt"></i> ${
                        element.location
                      }</p>
                      <p class="meetup"><i class="fas fa-calendar-alt"></i> ${moment(
                        element.happeningon
                      ).format("MMMM Do YYYY, h:mm:ss a")}</p>
                      <button onclick="location.href='meetup_detail.html?meetupId=${
                        element.id
                      }';" class="btn btn-default">
                         view Questions
                     </button>
                     </div>`;
        const meetupContainer = document.getElementById("meetups");
        meetupContainer.innerHTML = output;
      });
    });

  footerYear.innerText = new Date().getFullYear();

  if (menuDate) {
    menuDate.innerText = new Date().toDateString();
  }
  if (toggleShow) {
    toggleShow.addEventListener("click", toggleNavbar);
  }
});
