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
  obj.otherName = ""
  return JSON.stringify(obj);
};

const checkStatus = response => {
  if (response.ok) {
    return Promise.resolve("response");
  }
  return Promise.reject(new Error(response.statusText));
};

// const fetchData = url =>
//   fetch(url)
//     .then(checkStatus)
//     .then(res => res.json())
//     .catch(error => console.log(error));

const handleFormSubmit = event => {
  event.preventDefault();

  const data = toJSONString(form);
  console.log(data);

  fetch("https://questioner-app-api.herokuapp.com/api/v1/auth/signup", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json/"
    },
    body: data
  })
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log(error));
};

form.addEventListener("submit", handleFormSubmit);
