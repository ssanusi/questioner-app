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
      response.data.forEach(element => {
        const row = `<tr>
        <td>${moment(element.happeningon).format("MMMM Do YYYY")}</td>
        <td>${element.topic}</td>
        <td>${element.location}</td>
        <td class="actions">
          <span>
            <button class="btn btn-light font-weight-bold">Edit</button>
          </span>
          <span>
            <button class="btn  btn-danger font-weight-bold">Delete</button>
          </span>
        </td>
      </tr>`;
        const tbref = document.getElementById("table").getElementsByTagName("tbody")[0];
        const newRow = tbref.insertRow(tbref.rows.length);
        newRow.innerHTML = row;
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
