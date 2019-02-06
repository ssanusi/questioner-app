const tbref = document.getElementById("table").getElementsByTagName("tbody")[0];
const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("username"));
const url = "https://questioner-app-api.herokuapp.com/api/v1/meetups/";
const bearer = `Bearer ${token}`;
const userLi = document.getElementById("user");

window.addEventListener("load", () => {
  const footerYear = document.getElementById("year");
  const menuDate = document.getElementById("date");
  const toggleShow = document.querySelector(".toggle-show");
  const toggleNavbar = () => {
    const navContainer = document.getElementsByClassName("nav-container")[0];
    navContainer.classList.toggle("navbar-toggle-show");
  };
  if (!token) {
    window.location.href = "admin_signin.html";
  }

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
      response.data.forEach(element => {
        const row = `<tr>
        <td>${moment(element.happeningon).format("MMMM Do YYYY")}</td>
        <td>${element.topic}</td>
        <td>${element.location}</td>
        <td class="actions">
          <span>
            <button class="btn btn-light font-weight-bold" data-edit=${element.id} >Edit</button>
          </span>
          <span>
            <button class="btn  btn-danger font-weight-bold" data-delete=${
              element.id
            }>Delete</button>
          </span>
        </td>
      </tr>`;

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

const handleButtonClick = event => {
  if (event.target.matches("[data-delete]")) {
    const id = event.target.getAttribute("data-delete");
    fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        window.location.reload();
        window.alert(response.message);
      });
  }
};
tbref.addEventListener("click", handleButtonClick);
