$(document).ready(function () {
  //regular expression
  //TODO dropodown, checkbox, radio buttons
  document
    .querySelector("#sendbutton")
    .addEventListener("click", function check(event) {
      event.stopImmediatePropagation();
      event.preventDefault();
      let errors = [];
      var name = document.querySelector("#name").value;
      var email = document.querySelector("#email-form").value;
      var phone = document.querySelector("#phone-form").value;
      var message = document.querySelector("#message-form").value;

      var inputName = document.querySelector("#name");
      var inputEmail = document.querySelector("#email-form");
      var inputPhone = document.querySelector("#phone-form");
      var inputMessage = document.querySelector("#message-form");

      var regexName = /^[A-Z][a-z]+$/;
      if (!regexName.test(name)) {
        inputName.classList.remove("Correct");
        inputName.classList.add("Incorrect");
        errors.push(
          "Please write a correct name! Example of a correctly written name: Maria Elias"
        );
      } else {
        inputName.classList.remove("Incorrect");
        inputName.classList.add("Correct");
      }

      var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if (!regexEmail.test(email)) {
        inputEmail.classList.remove("Correct");
        inputEmail.classList.add("Incorrect");
        errors.push(
          "Please write a correct mail! Example of a correctly written mail address: mariaelias@hotmail.com"
        );
      } else {
        inputEmail.classList.remove("Incorrect");
        inputEmail.classList.add("Correct");
      }

      var regexPhone = /^06[01234569][\d]{6,7}$/;
      if (!regexPhone.test(phone)) {
        inputPhone.classList.remove("Correct");
        inputPhone.classList.add("Incorrect");
        errors.push(
          "Please write a correct phone number! Example of a correctly written phone number: 064258879"
        );
      } else {
        inputPhone.classList.remove("Incorrect");
        inputPhone.classList.add("Correct");
      }

      var regexMessage = /^[A-ZČĆŽŠĐ][a-zčćžšđ]([\d \w]{5,100})$/;
      if (!regexMessage.test(message)) {
        inputMessage.classList.remove("Correct");
        inputMessage.classList.add("Incorrect");
        errors.push(
          "Please write a correct message! Example of a correctly written message:A message of 5 to 100 characters"
        );
      } else {
        inputPhone.classList.remove("Incorrect");
        inputPhone.classList.add("Correct");
      }

      var errorHtml = errors.map((error) => {
        return $(`<div>${error}</div>`);
      });
      $("#errors").empty();
      $.each(errorHtml, function (i, val) {
        $("#errors").append(val);
      });
    });
});
