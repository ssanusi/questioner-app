const meetupUrl = "https://questioner-app-api.herokuapp.com/api/v1/meetups/";
const token = JSON.parse(localStorage.getItem("token"));
const userId = localStorage.getItem("userId");
const bearer = `Bearer ${token}`;
const meetupDetail = document.getElementById("meetup-detail");
const questionContainer = document.getElementById("question-container");
const modal = document.getElementById("questionModal");
const form = document.getElementById("questionForm");
const questionUrl = "https://questioner-app-api.herokuapp.com/api/v1/questions/";

const getParamUrl = () => {
  const urlString = window.location.search.substring(1);
  const params = urlString.split("=")[1];
  return params;
};
const meetupId = getParamUrl();
const questionsUrl = `https://questioner-app-api.herokuapp.com/api/v1/questions?id=${meetupId}`;

window.addEventListener("load", () => {
  if (!token) {
    window.location.href = "signin.html";
  }

  fetch(meetupUrl + meetupId, {
    method: "GET",
    headers: {
      Authorization: bearer
    }
  })
    .then(res => res.json())
    .then(response => {
      meetupDetail.innerHTML = `<div class="meetup-detail">
        <h1><i class="fab fa-meetup"></i> ${response.data[0].topic}</h1>
        <p><i class="fas fa-map-marker-alt"></i> ${response.data[0].location}</p>
        <p><i class="fas fa-calendar-alt"></i> ${moment(response.data[0].happeningon).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}</p>
        <button class="btn btn-default font-weight-bold" id="askQuestion">
        <i class="fas fa-bullhorn"></i>ask question
      </button>
    </div>
    <img src="${response.data[0].images[0]}" alt="">
    <div class="meetup-rsvp">
          <h1>Are you coming</h1>
          <i class="far fa-calendar-check fa-3x"></i>
          <i class="far fa-calendar-times fa-3x"></i>

      </div>
      <div class="rsvp">
        <h1>confirmed</h1>
        <i class="far fa-check-circle fa-3x"></i>
        <i class="far fa-times-circle fa-3x"></i>
    </div>`;
    });

  fetch(questionsUrl, {
    method: "GET",
    headers: {
      Authorization: bearer
    }
  })
    .then(res => res.json())
    .then(response => {
      let output = "<h1>Questions</h1>";
      const sorted = response.data.sort((a, b) => a.downvotes - b.downvotes);
      sorted.forEach(element => {
        output += `<div class="question-menu-item">
       <div class="question-header"><h2 id="${element.id}">${element.title}</h2></div>
       <div class="question-body">
         <h3>${element.body}</h3>
         <h4><i class="fas fa-user-circle fa-2x"></i> ${element.firstname} ${element.lastname}</h4>
       </div>
       <div class="question-vote">
         <h4><i class="far fa-thumbs-up fa-3x" data-upvote=${element.id}></i>${element.upvotes}</h4>

         <h4><i class="far fa-thumbs-down fa-3x"  data-downvote=${element.id}></i>${
          element.downvotes
        }</h4>
       </div>
       <div>
         <h3>comments<i class="fas fa-sort-down fa-2x"></i></h3>
       </div>
       <div class="comments-container">
         <div class="comment-input">
           <input type="comment" name="" id="" placeholder="comments" />
         </div>
         <div class="comment">
           <h3>i like this question</h3>
           <h4><i class="fas fa-user-circle"></i>ssanusi</h4>
         </div>
         <div class="comment">
           <h3>i like this question</h3>
           <h4><i class="fas fa-user-circle"></i>ssanusi</h4>
         </div>
       </div>
     </div>`;
      });
      questionContainer.innerHTML = output;
    });
});

const handleButtonClick = event => {
  event.preventDefault();

  if (event.target.getAttribute("id") === "askQuestion") {
    modal.style.display = "block";
  }

  if (event.target.getAttribute("class") === "close" || event.target === modal) {
    modal.style.display = "none";
  }

  if (event.target === modal) {
    modal.style.display = "none";
  }

  if (event.target.id === "submitQuestion") {
    let data = toJSONString(form);
    data = JSON.parse(data);
    data = Object.assign(data, { userId, meetupId });
    const url = "https://questioner-app-api.herokuapp.com/api/v1/questions/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: bearer, "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 201) {
          window.location.reload("true");
        }
      });
  }
  if (event.target.matches("[data-upvote]")) {
    const id = event.target.getAttribute("data-upvote");
    fetch(`${questionUrl}${id}/upvote`, {
      method: "PATCH",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        window.location.reload(true);
      });
  }
  if (event.target.matches("[data-downvote]")) {
    const id = event.target.getAttribute("data-downvote");
    fetch(`${questionUrl}${id}/downvote`, {
      method: "PATCH",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {
        window.location.reload(true);
      });
  }
};

window.addEventListener("click", handleButtonClick);
