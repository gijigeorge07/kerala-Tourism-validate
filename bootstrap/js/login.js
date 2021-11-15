const emailEll = document.querySelector("#email");
const passwordEll = document.querySelector("#password");

const forms = document.querySelector("#login");

const checkEmail1 = () => {
  let valid = false;
  const email = emailEll.value.trim();
  if (!isRequired(email)) {
    showError(emailEll, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEll, "Email is not valid.");
  } else {
    showSuccess(emailEll);
    valid = true;
  }
  return valid;
};

const checkPassword1 = () => {
  let valid = false;

  const password = passwordEll.value.trim();

  if (!isRequired(password)) {
    showError(passwordEll, "Password cannot be blank.");
  }
  // else if (!isPasswordSecure(password)) {
  //   showError(
  //     passwordEll,
  //     "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
  //   );
  // }
  else {
    showSuccess(passwordEll);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
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

forms.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isEmailValid = checkEmail1(),
    isPasswordValid = checkPassword1();

  let isFormValid = isEmailValid && isPasswordValid;

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

forms.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "email":
        checkEmail1();
        break;
      case "password":
        checkPassword1();
        check_pass();
        break;
    }
  })
);
