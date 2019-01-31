const form = document.getElementById("meetup-form");
const statusDiv = document.getElementById("status");

const handleFormSubmit = event => {
  event.preventDefault();

  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("username"));
  if (!token) {
    window.location.href = "signin.html";
  }

  const data = toJSONString(form);
  const formObj = JSON.parse(data);
  formObj.images = [formObj.images];
  formObj.tags = [formObj.tags];
  const url = "https://questioner-app-api.herokuapp.com/api/v1/meetups";
  const bearer = `Bearer ${token}`;
  const userLi = document.getElementById("user");
  userLi.textContent = user;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(formObj),
    headers: { Authorization: bearer, "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 201) {
        statusDiv.innerHTML = `<div class="success"><h4>Meetup created Sucessfully</h4></div>`;
        setTimeout(() => {
          window.location.href = "meetups_dashboard.html";
        }, 2000);
      }
      if (response.message === "Unauthorized Admin Route") {
        statusDiv.innerHTML = `<div class="error"><h4>Unauthorized only Admin can Admin Can create meetup</h4></div>`;
        setTimeout(() => {
          window.location.href = "meetups_dashboard.html";
        }, 2000);
      }
    });
};

form.addEventListener("submit", handleFormSubmit);
