window.addEventListener("load", () => {
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

const modal = document.getElementById("questionModal");

const btn = document.getElementById("askQuestion");

const span = document.getElementsByClassName("close")[0];

btn.onclick = () => {
  modal.style.display = "block";
};

span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
