const form = document.getElementById("form3");
const pass = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const genderFb = document.getElementById("genderFb");
const genders = form.querySelectorAll("input[name='gender']");
const fields = form.querySelectorAll(".form-control, .form-select");

function setMessage(input) {
  const fb = input.parentElement.querySelector(".invalid-feedback");
  const v = input.validity;
  if (v.valueMissing) {
    fb.textContent = input.dataset.required;
  } else if (v.typeMismatch) {
    fb.textContent = "Please enter a valid email, like name@example.com";
  } else if (input.id === "password") {
    fb.textContent = "Password needs 8+ characters, with a letter and a number";
  } else {
    fb.textContent = input.validationMessage;
  }
}

//to check passwd match
function checkMatch() {
  if (confirmPass.value !== "" && confirmPass.value !== pass.value) {
    confirmPass.setCustomValidity("Passwords do not match");
  } else {
    confirmPass.setCustomValidity("");
  }
}

function checkField(input) {
  if (input === confirmPass) checkMatch();
  const good = input.checkValidity();
  if (!good) setMessage(input);
  input.classList.toggle("is-valid", good);
  input.classList.toggle("is-invalid", !good);
  return good;
}

function checkGender() {
  const picked = form.querySelector("input[name='gender']:checked");
  genders.forEach(function (r) {
    r.classList.toggle("is-invalid", !picked);
  });
  genderFb.classList.toggle("d-block", !picked);
  return !!picked;
}

fields.forEach(function (input) {
  input.addEventListener("blur", function () {
    checkField(input);
  });
  input.addEventListener("input", function () {
    if (input.classList.contains("is-valid") || input.classList.contains("is-invalid")) {
      checkField(input);
    }
  });
});


pass.addEventListener("input", function () {
  if (confirmPass.value !== "") checkField(confirmPass);
});

genders.forEach(function (r) {
  r.addEventListener("change", checkGender);
});

