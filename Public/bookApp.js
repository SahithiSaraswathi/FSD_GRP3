const form = document.getElementById("form");
const username = document.getElementById("name");
const tname = document.getElementById("tname");
const email = document.getElementById("email");
const date = document.getElementById("date");
const number = document.getElementById("number");
const errorElement = document.getElementById("error");
form.addEventListener("submit", (e) => {
  let messages = [];
  if (username.value == "" || username.value == null) {
    messages.push("name can't be empty");
  }
  if (email.value == "" || email.value == null) {
    messages.push("Email can't be empty");
  }
  if (date.value == "" || date.value == null) {
    messages.push("Date can't be empty");
  }
  if (number.value == "" || number.value == null) {
    messages.push("Phone number can't be empty");
  }if (email.value == "" || email.value == null) {
    messages.push("Email can't be empty");
  }if (mode.value == "" || mode.value == null) {
    messages.push("Please choose your counselling mode");
  }
  if (tname.value == "" || tname.value == null) {
    messages.push("choose your Therapist");
  }
  if (messages.length > 0) {
    e.preventDefault(); //prevents from submitting
    errorElement.innerText = messages.join(" ,");
  } else {
    window.alert("Login Successful.");
  }
});
