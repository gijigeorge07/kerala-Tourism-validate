const firstnameEl = document.querySelector("#firstname");
const lastnameEl = document.querySelector("#lastname");
const emailEl = document.querySelector("#email");
const phoneEl = document.querySelector("#phone");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const form = document.querySelector("#signup");

const checkFirstname = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const firstname = firstnameEl.value.trim();

  if (!isRequired(firstname)) {
    console.log(!isRequired(firstname));
    showError(firstnameEl, "Firstname cannot be blank.");
  } else if (!isBetween(firstname.length, min, max)) {
    showError(
      firstnameEl,
      `Firstname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(firstnameEl);
    valid = true;
  }
  return valid;
};

const checkLastname = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const lastname = lastnameEl.value.trim();

  if (!isRequired(lastname)) {
    console.log(!isRequired(lastname));
    showError(lastnameEl, "Lastname cannot be blank.");
  } else if (!isBetween(lastname.length, min, max)) {
    showError(
      lastnameEl,
      `Lastname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(lastnameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Please enter a valid email address.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPhone = () => {
  let valid = false;
  const phone = phoneEl.value.trim();
  if (!isRequired(phone)) {
    showError(phoneEl, "Phone number cannot be blank.");
  } else if (!isPhoneValid(phone)) {
    showError(phoneEl, "phone number is not valid.");
  } else {
    showSuccess(phoneEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number."
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const isPhoneValid = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isFirstnameValid = checkFirstname(),
    isLastnameValid = checkLastname(),
    isEmailValid = checkEmail(),
    isPhoneValid = checkPhone(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isFirstnameValid &&
    isLastnameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    window.location.href = "district.html";
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "firstname":
        checkFirstname();
        break;
      case "lastname":
        checkLastname();
        break;
      case "email":
        checkEmail();
        break;
      case "phone":
        checkPhone();
        break;
      case "password":
        checkPassword();
        check_pass();
        break;
      case "confirm-password":
        checkConfirmPassword();
        check_pass1();
        break;
    }
  })
);

function check_pass() {
  var val = document.getElementById("password").value;
  var meter = document.getElementById("meter");

  var no = 0;
  if (val != "") {
    meter.style.display = "block";
    meter.style.display = "flex";
    // If the password length is greater than 6 and contain any lowercase alphabet or any number or any special character
    if (
      val.length <= 4 ||
      val.match(/[a-z]/) ||
      val.match(/\d+/) ||
      val.match(/.[A-Z]/)
    )
      no = 2;

    // If the password length is greater than 6 and contain alphabet,number,special character respectively
    if (
      val.length >= 4 ||
      (val.match(/[a-z]/) && val.match(/\d+/) && val.match(/.[A-Z]/))
    )
      no = 3;

    // If the password length is greater than 6 and must contain alphabets,numbers and special characters
    if (
      val.length >= 8 &&
      val.match(/[a-z]/) &&
      val.match(/\d+/) &&
      val.match(/.[A-Z]/)
    )
      no = 4;

    if (no == 2) {
      $("#meter").animate({ width: "30%" }, 300);
      meter.style.display = "block";

      meter.style.backgroundColor = "red";
      document.getElementById("pass_type").innerHTML = "Weak";
    }

    if (no == 3) {
      $("#meter").animate({ width: "60%" }, 300);
      meter.style.backgroundColor = "#FF8000";
      document.getElementById("pass_type").innerHTML = "Good";
    }

    if (no == 4) {
      $("#meter").animate({ width: "100%" }, 300);
      meter.style.backgroundColor = "#00FF40";
      document.getElementById("pass_type").innerHTML = "Strong";
    }
  } else {
    meter.style.backgroundColor = "transparent";
    document.getElementById("pass_type").innerHTML = "";
  }
}

function check_pass1() {
  var val1 = document.getElementById("confirm-password").value;
  var meter1 = document.getElementById("meter1");

  var no = 0;
  if (val1 != "") {
    // If the password length is greater than 6 and contain any lowercase alphabet or any number or any special character
    if (
      val1.length <= 4 ||
      val1.match(/[a-z]/) ||
      val1.match(/\d+/) ||
      val1.match(/.[A-Z]/)
    )
      no = 2;

    // If the password length is greater than 6 and contain alphabet,number,special character respectively
    if (
      val1.length >= 4 ||
      (val1.match(/[a-z]/) && val1.match(/\d+/) && val1.match(/.[A-Z]/))
    )
      no = 3;

    // If the password length is greater than 6 and must contain alphabets,numbers and special characters
    if (
      val1.length >= 8 &&
      val1.match(/[a-z]/) &&
      val1.match(/\d+/) &&
      val1.match(/.[A-Z]/)
    )
      no = 4;

    if (no == 2) {
      $("#meter1").animate({ width: "30%" }, 300);
      // meter1.style.display = "block";

      meter1.style.backgroundColor = "red";
      document.getElementById("pass_type").innerHTML = "Weak";
    }

    if (no == 3) {
      $("#meter1").animate({ width: "60%" }, 300);
      meter1.style.backgroundColor = "#FF8000";
      document.getElementById("pass_type").innerHTML = "Good";
    }

    if (no == 4) {
      $("#meter1").animate({ width: "100%" }, 300);
      meter1.style.backgroundColor = "#00FF40";
      document.getElementById("pass_type").innerHTML = "Strong";
    }
  } else {
    meter1.style.backgroundColor = "transparent";
    document.getElementById("pass_type").innerHTML = "";
  }
}
