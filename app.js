var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl);
});

function showToast() {
  toastList[0].show();
}

// Enable Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

function goToProductDetails() {
  window.location.href = "/product1.html";
}

function goToProductDetails2() {
  window.location.href = "/product2.html";
}

function goToProductDetails3() {
  window.location.href = "/product3.html";
}

function goToProductDetails4() {
  window.location.href = "/product4.html";
}

function goToProductDetails5() {
  window.location.href = "/product5.html";
}

function goToProductDetails6() {
  window.location.href = "/product6.html";
}

function goToProductDetails7() {
  window.location.href = "/product7.html";
}
function goToProductDetails8() {
  window.location.href = "/product8.html";
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
