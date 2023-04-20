const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pw = document.getElementById('password');
const pw2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement; // impo
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email Validaty
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase()); // imp -> make sure string + lower
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${min} characters`
    );
  } else {
    console.log('correct length');
    showSuccess(input);
  }
}

// Check Password Match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Passwords do not match`);
  } else {
    showSuccess(input2);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, pw, pw2]);
  checkLength(username, 3, 15);
  checkLength(pw, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(pw, pw2);
});
