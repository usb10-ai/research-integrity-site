document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav.main");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Order form: no payment gateway is wired up yet (TODO once Razorpay/Stripe is chosen).
  // For now this builds a summary and opens a pre-filled email to the business inbox so
  // Phase 1 (manual processing) can begin: https://example.com plan calls this "simple
  // upload/payment/report workflow" — payment + document handoff happens by email/call
  // until a real gateway + upload backend is wired up.
  var orderForm = document.getElementById("order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(orderForm);
      var product = data.get("product");
      var name = data.get("name");
      var email = data.get("email");
      var phone = data.get("phone");
      var institution = data.get("institution");
      var wordCount = data.get("wordcount");
      var notes = data.get("notes");

      var subject = "Research Integrity Check request - " + product;
      var body =
        "Product: " + product + "\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Institution: " + institution + "\n" +
        "Approx. word count: " + wordCount + "\n" +
        "Notes: " + notes + "\n\n" +
        "(Document will be shared securely after payment instructions are confirmed.)";

      var mailto =
        "mailto:work.researchintegrity@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var confirmBox = document.getElementById("order-confirm");
      if (confirmBox) {
        confirmBox.hidden = false;
        confirmBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.location.href = mailto;
    });
  }
});
