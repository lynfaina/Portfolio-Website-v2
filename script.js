function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


document.addEventListener("DOMContentLoaded", function () {
  if (typeof emailjs !== "undefined") {
    try { emailjs.init("twiW0wxiSPtPt9dwL"); } catch (err) { console.warn("EmailJS init warning", err); }
  }

  const form = document.getElementById("contact-form");
  const btn = form ? form.querySelector(".btn-submit") : null;
  const statusEl = document.getElementById("contact-status");

  if (!form) return; 

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.disabled = true;
    const originalBtnText = btn.textContent;
    btn.textContent = "Sending...";

    if (statusEl) {
      statusEl.hidden = false;
      statusEl.className = "contact-status";
      statusEl.textContent = "Sending your message...";
    }

    emailjs.sendForm("service_cagegxg", "template_2bz9tsp", form)
      .then(function (response) {

        if (statusEl) {
          statusEl.classList.add("success");
          statusEl.textContent = "Message sent! Thank you — I will get back to you soon.";
        }

        form.reset();

        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = originalBtnText;
        }, 2500);
      }, function (error) {
        console.error("EmailJS error:", error);
        if (statusEl) {
          statusEl.classList.add("error");
          statusEl.textContent = "Oops — something went wrong. Please try again.";
        }

        btn.disabled = false;
        btn.textContent = originalBtnText;
      });
  });
});
