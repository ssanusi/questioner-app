window.addEventListener("load", () => {
  fetch("https://questioner-app-fullstack.herokuapp.com/api/v1/meetups/upcoming")
    .then(res => res.json())
    .then(response => {
      let output = "";
      response.data.forEach(element => {
        const spinner = document.getElementById("spinner");
        spinner.style.display = "none";
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
        const meetupContainer = document.getElementById("meetup-container");
        meetupContainer.innerHTML = output;
      });
    });

  const footerYear = document.getElementById("year");
  const menuDate = document.getElementById("date");
  const toggleShow = document.querySelector(".toggle-show");
  const toggleNavbar = () => {
    const navContainer = document.getElementsByClassName("nav-container")[0];
    navContainer.classList.toggle("navbar-toggle-show");
  };

  footerYear.innerText = new Date().getFullYear();

  if (menuDate) {
    menuDate.innerText = new Date().toDateString();
  }
  if (toggleShow) {
    toggleShow.addEventListener("click", toggleNavbar);
  }
});
