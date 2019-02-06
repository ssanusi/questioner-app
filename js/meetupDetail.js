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
          <div>
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
         <h3>comments<i class="fas fa-sort-down fa-2x" data-comments=${element.id}></i></h3>
       </div>
       <div class="comments-container" >
       <div class="comment-input">
          <input type="comment" name="" id="" placeholder="comments" />
       </div>
       <div id="comments-container">
       </div>
       </div>
     </div>`;
      });
      questionContainer.innerHTML = output;
    });

  fetch(`${meetupUrl}rsvps`, {
    method: "GET",
    headers: {
      Authorization: bearer
    }
  })
    .then(res => res.json())
    .then(response => {
      const meetupRsvp = document.getElementById("meetup-rsvp");

      const rsvped = response.data.findIndex(
        element => element.meetupid === parseInt(meetupId, 10)
      );

      if (response.data.length === 0 || rsvped === -1) {
        meetupRsvp.style.display = "block";
      } else if (response.data[rsvped].response === "yes") {
        const rsvpStatus = document.getElementById("rsvpStatus");
        rsvpStatus.innerHTML = `<h1>confirmed</h1>
                                <i class="far fa-check-circle fa-3x"></i>`;
        rsvpStatus.style.display = "block";
      } else if (response.data[rsvped].response === "no") {
        const rsvpStatus = document.getElementById("rsvpStatus");
        rsvpStatus.innerHTML = `<h1>confirmed</h1>
                               <i class="far fa-times-circle fa-3x"></i>`;
        rsvpStatus.style.display = "block";
      }
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
  if (event.target.matches("[data-comments]")) {
    const questionId = event.target.getAttribute("data-comments");
    const commentsUrl = `https://questioner-app-api.herokuapp.com/api/v1/comments?questionId=${questionId}`;
    fetch(commentsUrl, {
      method: "GET",
      headers: {
        Authorization: bearer
      }
    })
      .then(res => res.json())
      .then(response => {

        let output = "";
        response.data.forEach(element => {
          output += `<div class="comment">
                      <h4>${element.comment}</h4>
                       <h5><i class="fas fa-user-circle"></i> ${element.firstname} ${
            element.lastname
          }</h5>
                    </div>`;
        });

        const commentsContainer = document.getElementById("comments-container");
        commentsContainer.innerHTML = output;
        commentsContainer.style.display = "block";
      });  
  }
};

  if (event.target.matches("[data-rsvpin]")) {
    const data = JSON.stringify({ meetupId, status: event.target.getAttribute("data-rsvpin") });
    fetch(`${meetupUrl}${meetupId}/rsvps`, {
      method: "POST",
      body: data,
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
