document.addEventListener("DOMContentLoaded", () => {
  const regex = document.querySelector("#submit");

  regex.addEventListener("click", function proveri(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var errors = [];
    var name = document.querySelector("#form-name").value;
    var email = document.querySelector("#form-email").value;
    var phone = document.querySelector("#form-phone").value;
    var text = document.querySelector("#form-text").value;
    var genValues = false;

    var inputName = document.querySelector("#form-name");
    var inputEmail = document.querySelector("#form-email");
    var inputPhone = document.querySelector("#form-phone");
    var inputText = document.querySelector("#form-text");

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
    var regexText = /^[A-ZČĆŽŠĐ][a-zčćžšđ]([\d \w]{5,100})$/;
    if (!regexText.test(text)) {
      inputText.classList.remove("Correct");
      inputText.classList.add("Incorrect");
      errors.push(
        "Please write a correct message! Example of a correctly written message:A message of 5 to 100 characters and first letter capital"
      );
    } else {
      inputText.classList.remove("Incorrect");
      inputText.classList.add("Correct");
    }

    errorHtml = errors.map((error) => {
      return $(`<div>${error}</div>`);
    });
    $("#errors").empty();
    $.each(errorHtml, function (i, val) {
      $("#errors").append(val);
    });

    for (var i = 0; i < gender.length; i++) {
      if (gender[i].checked == true) {
        genValues = true;
      }
    }

    if (!genValues) {
      errors.push("Please choose the gender!");
      return false;
    }
  });
});
