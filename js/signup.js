const form = document.getElementById("signUp");

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

  return obj;
};

const handleFormSubmit = event => {
  event.preventDefault();

  const data = toJSONString(form);
  console.log(data);

  fetch("https://questioner-app-api.herokuapp.com/api/v1/auth/signup", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
};

form.addEventListener("submit", handleFormSubmit);
