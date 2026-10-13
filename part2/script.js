const form = document.getElementById("form2");
const fields = form.querySelectorAll("input, textarea");


function setMessage(input) {
  const fb = input.parentElement.querySelector(".invalid-feedback");
  if (input.validity.valueMissing) {
    fb.textContent = input.dataset.required;
  } else if (input.validity.typeMismatch) {
    fb.textContent = "Please enter a valid email, like name@example.com";
  } else {
    fb.textContent = input.validationMessage;
  }
}

function checkField(input) {
  const good = input.checkValidity();
  if (!good) setMessage(input);
  input.classList.toggle("is-valid", good);
  input.classList.toggle("is-invalid", !good);
  return good;
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

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let allGood = true;
  fields.forEach(function (input) {
    if (!checkField(input)) allGood = false;
  });
  okBox.classList.toggle("d-none", !allGood);
});