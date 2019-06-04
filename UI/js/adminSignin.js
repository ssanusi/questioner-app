const form = document.getElementById("login");
const statusDiv = document.getElementById("status");

const handleFormSubmit = event => {
  event.preventDefault();
  if (event.target.matches("form")){
    const submitBtn = event.target.children[5];
    submitBtn.disable = true;
    submitBtn.innerText = "Signing In.....";
  }

  const data = toJSONString(form);
  const url = "https://questioner-app-fullstack.herokuapp.com/api/v1/admin/auth/login";
  fetch(url, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data[0].token));
        localStorage.setItem("username", JSON.stringify(response.data[0].user.username));
        statusDiv.innerHTML = `<div class="success"><h4>${response.data[0].message}</h4></div>`;
        setTimeout(() => {
          window.location.href = "meetups_dashboard.html";
        }, 2000);
      }
      if (response.status === 401) {
        statusDiv.innerHTML = `<div class="error"><h4>Unauthorized</h4></div>`;
        setTimeout(() => {
          window.location.href = "signin.html";
        }, 2000);
      }
      if (response.error) {
        if (response.error === "User not Found") {
          statusDiv.innerHTML = `<div class="error"><h4> account not found please register </h4></div>`;
          setTimeout(() => {
            window.location.href = "admin_signup.html";
          }, 1000);
        }
        if (response.error === "invalid credentials") {
          statusDiv.innerHTML = `<div class="error"><h4>Invalid Credentials</h4></div>`;
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }
      }
    });
};

form.addEventListener("submit", handleFormSubmit);
