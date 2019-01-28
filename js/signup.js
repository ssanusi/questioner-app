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

  return JSON.stringify(obj);
};

const handleFormSubmit = event => {
  event.preventDefault();

  const data = toJSONString(form);
  console.log(data)

  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  };

  fetch("https://questioner-app-api.herokuapp.com/api/v1/auth/signup", options)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

form.addEventListener("submit", handleFormSubmit);
