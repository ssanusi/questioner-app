const form = document.getElementById("login");
const statusDiv = document.getElementById("status");

const toJSONString = formhtml => {
  const obj = {};
  const elements = formhtml.querySelectorAll("input, select, textarea");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const { name, value } = element;
    if (name) {
      obj[name] = value.trim();
    }
  }

  return JSON.stringify(obj);
};

const handleFormSubmit = event => {
  event.preventDefault();

  const data = toJSONString(form);
  console.log(data);
  const url = "https://questioner-app-api.herokuapp.com/api/v1/auth/login";
  fetch(url, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data[0].token));
        statusDiv.innerHTML = `<div class="success"><h4>${response.data[0].message}</h4></div>`;
        setTimeout(() => {
          window.location.href = "meetups.html";
        }, 2000);
      }
      if (response.error) {
        if (response.error === "User not Found") {
          statusDiv.innerHTML = `<div class="error"><h4> account not found please register </h4></div>`;
        }
        if (response.error === "invalid credentials") {
          statusDiv.innerHTML = `<div class="error"><h4>Invalid Credentials</h4></div>`;
        }
      }
    });
};

form.addEventListener("submit", handleFormSubmit);
