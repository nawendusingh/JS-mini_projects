// select all inputs and form as well
// this is why giving id to all elements is a good idea
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
// show input error message
function showError(input, message) {
  // input element's parent and change its class as per css rules
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  //   queryselector can select anything-->class,id,tag etc
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success green outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
// check valid email
function checkEmail(input) {
  // stackoverflow search result
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   checks if pattern is present in the email string or not -->Boolean
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email  is not valid");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkRequired(inputArr) {
  // high order array methods take functions
  inputArr.forEach(function(input) {
    //   trim to remove whitespace if any
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}
// add an event listener
// add to form element which wil llisten to "submit" event and then
// run the function with event parameter whose methods we will use
// like the preventdefault method
form.addEventListener("submit", function(e) {
  // stop the default event behavior of submit which is quick disappearance of values
  e.preventDefault();
  //   username will give the input element .value will give the value submitted
  //   if (username.value === "") {
  //     showError(username, "Username is required!");
  //   } else {
  //     showSuccess(username);
  //   }
  //   if (email.value === "") {
  //     showError(email, "Email is required!");
  //   } else if (!isValidEmail(email.value)) {
  //     showError(email, "Email is not valid");
  //   } else {
  //     showSuccess(email);
  //   }
  //   if (password.value === "") {
  //     showError(password, "Password is required!");
  //   } else {
  //     showSuccess(password);
  //   }
  //   if (password2.value === "") {
  //     showError(password2, "Password2 is required!");
  //   } else {
  //     showSuccess(password2);
  //   }

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
