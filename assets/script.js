document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav.main");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Order form: submits to Web3Forms (https://web3forms.com), which forwards the
  // submission straight to work.researchintegrity@gmail.com. No backend of our own
  // needed. Requires a real access_key in order.html (see hidden input) — get one
  // free at web3forms.com using the same inbox.
  var orderForm = document.getElementById("order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var confirmBox = document.getElementById("order-confirm");
      var errorBox = document.getElementById("order-error");
      var submitBtn = document.getElementById("order-submit");
      if (confirmBox) confirmBox.hidden = true;
      if (errorBox) errorBox.hidden = true;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

      var data = new FormData(orderForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            orderForm.reset();
            if (confirmBox) {
              confirmBox.hidden = false;
              confirmBox.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          } else if (errorBox) {
            errorBox.hidden = false;
            errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .catch(function () {
          if (errorBox) {
            errorBox.hidden = false;
            errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send request"; }
        });
    });
  }
});
