const { append } = require("express/lib/response");
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorElement = document.getElementById("error");
form.addEventListener("submit", (e) => {
  let messages = [];
  if (username.value == "" || username.value == null) {
    messages.push("Username can't be empty");
  }
  if (password.value.length <= 6) {
    messages.push("Password must be longer than 6 characters");
  }
  if (password.value.length >= 20) {
    messages.push("Password must not be longer tham 20");
  }
  if (messages.length > 0) {
    e.preventDefault(); //prevents from submitting
    errorElement.innerText = messages.join(" ,");
  }
});
