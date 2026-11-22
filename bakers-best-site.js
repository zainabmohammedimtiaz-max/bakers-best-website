// Bakers Best — small client-side interactions using functions, arrays and DOM events.
var menuToggle = document.getElementById("menuToggle");
var mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
    var isOpen = mainNav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen ? "×" : "☰";
  });
}

// Newsletter form: HTML5 input types + JavaScript validation and submit event.
var newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("newsletterName").value.trim();
    var email = document.getElementById("newsletterEmail").value.trim();
    var message = document.getElementById("newsletterMessage");
    if (name === "" || email === "") {
      message.textContent = "Please complete both fields.";
      return;
    }
    message.textContent = "Thank you, " + name + " — you're on our list (demo only).";
    newsletterForm.reset();
  });
}

// Rewards points calculator: input event, arithmetic and a programmer-defined function.
var spendRange = document.getElementById("spendRange");
function calculatePoints(spend) {
  var monthly = spend;
  var yearly = monthly * 12;
  return [monthly, yearly];
}
function updateCalculator() {
  var spend = Number(spendRange.value);
  var points = calculatePoints(spend);
  document.getElementById("spendValue").textContent = spend.toLocaleString("en");
  document.getElementById("monthlyPoints").textContent = points[0].toLocaleString("en");
  document.getElementById("yearlyPoints").textContent = points[1].toLocaleString("en");
}
if (spendRange) {
  spendRange.addEventListener("input", updateCalculator);
  updateCalculator();
}

// Rewards membership form: required fields, checkbox and simple validation.
var rewardsForm = document.getElementById("rewardsForm");
if (rewardsForm) {
  rewardsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("memberName").value.trim();
    var email = document.getElementById("memberEmail").value.trim();
    var phone = document.getElementById("memberPhone").value.trim();
    var consent = document.getElementById("memberConsent").checked;
    var message = document.getElementById("rewardsMessage");

    if (name === "" || email === "" || phone === "" || !consent) {
      message.textContent = "Please complete every field and tick the membership consent box.";
      return;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      message.textContent = "Please enter a valid email address.";
      return;
    }
    message.textContent = "Welcome to Bakers Best, " + name + "! Your membership is ready in this demo.";
    rewardsForm.reset();
  });
}

// FAQ accordion: a for loop registers click handlers on each question.
var faqQuestions = document.querySelectorAll(".faq-question");
for (var i = 0; i < faqQuestions.length; i++) {
  faqQuestions[i].addEventListener("click", function () {
    var item = this.parentElement;
    item.classList.toggle("open");
    var expanded = item.classList.contains("open");
    this.setAttribute("aria-expanded", expanded);
  });
}
