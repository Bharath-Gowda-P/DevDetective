const url = "https://api.github.com/users/";
const input = document.querySelector("#search");
const submit = document.querySelector(".btn-search");
const profilePicture = document.querySelector("#avatar");
const profileName = document.querySelector(".profile-name");
const profileLink = document.querySelector("#user");
const joinedDate = document.querySelector(".date");
const userBio = document.querySelector(".bio");
const reposValue = document.querySelector("#repos");
const followersValue = document.querySelector("#followers");
const followingValue = document.querySelector("#following");
const userLocation = document.querySelector(".location");
const userWeb = document.querySelector("#page");
const userTwitter = document.querySelector(".twitter");
const userCompany = document.querySelector(".company");
const noResults = document.querySelector(".no-results");
const modeBtn = document.querySelector(".btn-mode");
const modeText = document.querySelector("#mode-text");
const modeIcon = document.querySelector("#mode-icon");
let darkMode = false;
const root = document.documentElement.style;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//Event listeners
submit.addEventListener("click", () => {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== null) {
        getUserData(url + input.value);
      }
    }
  },
  false
);

input.addEventListener("input", () => {
  noResults.style.display = "none";
});

modeBtn.addEventListener("click", () => {
  if (darkMode == false) {
    enableDarkProperties();
  } else {
    enableLightProperties();
  }
});

//Functions

//API Call
async function getUserData(gitUrl) {
  const response = await fetch(gitUrl);
  const data = await response.json();
  console.log(data);
  updateProfile(data);
}

//Render the content
function updateProfile(data) {
  if (data.message !== "Not Found") {
    noResults.style.display = "none";

    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }

    profilePicture.src = `${data.avatar_url}`;
    profileName.innerText = data.name === null ? data.login : data.name;
    profileLink.href = `${data.html_url}`;
    profileLink.innerText = `@${data.login}`;

    datesegments = data.created_at.split("T").shift().split("-");
    joinedDate.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;

    userBio.innerText = data.bio == null ? "No bio found" : `${data.bio}`;
    reposValue.innerText = `${data.public_repos}`;
    followersValue.innerText = `${data.followers}`;
    followingValue.innerText = `${data.following}`;
    userLocation.innerText = `${data.location}`;

    userWeb.href = data.blog === null ? "#" : `${data.blog}`;
    userWeb.innerHTML = checkNull(data.blog, page)
      ? data.blog
      : "Not Available";

    userTwitter.innerText = checkNull(data.twitter_username, userTwitter)
      ? data.twitter_username
      : "Not Available";
    userTwitter.href = checkNull(data.twitter_username, userTwitter)
      ? `https://www.twitter.com/${data.twitter_username}`
      : "#";

    userCompany.innerText = checkNull(data.company, userCompany)
      ? `${data.company}`
      : "Not Available";
  } else {
    noResults.style.display = "block";
  }
}

//dark mode
function enableDarkProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modeText.innerText = "LIGHT";
  modeIcon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}

//light mode
function enableLightProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modeText.innerText = "DARK";
  modeIcon.src = "./assets/images/moon-icon.svg";
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}

//initial function
function init() {
  //initialise dark mode = false
  //dark mode = true => we have to enable dark mode
  //dark mode = false => we have to enable light mode
  darkMode = false;

  const value = localStorage.getItem("dark-mode");

  if (value == null) {
    localStorage.setItem("dark-mode", darkMode);
    enableLightProperties();
  } else if (value == true) {
    enableDarkProperties();
  } else {
    enableLightProperties();
  }

  getUserData(url + "bharath-gowda-p");
}

init();
