// Bakers Best Cake Studio — live cake preview and configuration logic.
var cakeForm = document.getElementById("cakeForm");
var cakeTiers = document.getElementById("cakeTiers");
var cakeDecor = document.getElementById("cakeDecor");
var layerSlider = document.getElementById("cakeLayers");
var customColour = document.getElementById("customColour");
var cakeBrief = "";

var spongeColours = {
  "Vanilla bean": "#e9c995",
  "Dark chocolate": "#59372f",
  "Lemon zest": "#e7ca59",
  "Pistachio": "#a0a477",
  "Red velvet": "#a63b42",
  "Almond & rose": "#d9a9a2"
};
var fillingColours = {
  "Vanilla mascarpone": "#f5e5c9",
  "Raspberry compote": "#a93d58",
  "Salted caramel": "#bd793c",
  "Lemon curd": "#e7c64e",
  "Dark chocolate ganache": "#49302b",
  "Pistachio praline": "#8c9560",
  "Strawberry & rose": "#d67b86",
  "Apricot preserve": "#df9651"
};
var icingColours = {
  "Swiss meringue buttercream": "#f7e8cf",
  "Whipped cream": "#fffaf0",
  "Cream cheese frosting": "#f0e4d7",
  "Chocolate ganache": "#50342e",
  "Mascarpone cream": "#f3e7d5"
};

function selectedValue(name) {
  var selected = cakeForm.querySelector('input[name="' + name + '"]:checked');
  return selected ? selected.value : "";
}
function selectedText(id) {
  var field = document.getElementById(id);
  return field.options ? field.options[field.selectedIndex].text : field.value;
}
function selectedToppings() {
  var checked = cakeForm.querySelectorAll('input[name="topping"]:checked');
  var list = [];
  for (var i = 0; i < checked.length; i++) list.push(checked[i].value);
  return list;
}
function currentFrostingColour() {
  var colour = selectedValue("colour");
  if (colour === "custom") return customColour.value;
  return colour || "#f4e8ce";
}
function syncLayerOptions() {
  var singleTier = Number(layerSlider.value) === 1;
  var filling = document.getElementById("filling");
  var icing = document.getElementById("icing");
  filling.disabled = singleTier;
  icing.disabled = singleTier;
  if (singleTier) {
    filling.value = "None";
    icing.value = "None";
  } else {
    if (filling.value === "None") filling.value = "Vanilla mascarpone";
    if (icing.value === "None") icing.value = "Swiss meringue buttercream";
  }
  filling.closest(".builder-step").classList.toggle("single-tier", singleTier);
}
function addBand(tier, className, colour) {
  if (!colour) return;
  var band = document.createElement("span");
  band.className = className;
  band.style.backgroundColor = colour;
  tier.appendChild(band);
}
function svgElement(markup, label) {
  var holder = document.createElement("span");
  holder.className = "garnish-item";
  holder.setAttribute("role", "img");
  holder.setAttribute("aria-label", label);
  holder.innerHTML = markup;
  return holder;
}
function garnishSvg(item) {
  var rose = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="#8b3544" stroke-width="1.6"><path d="M24 38C10 32 13 17 23 12c12-6 20 7 12 16-5 6-14 4-14-2 0-5 7-8 10-3"/><path d="M24 38c-3 4-7 5-10 5m10-5c3 4 7 5 10 5" stroke="#71805e"/></g></svg>';
  var daisy = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="#f7f0df" stroke="#c9b88e" stroke-width=".8"><ellipse cx="24" cy="11" rx="4" ry="8"/><ellipse cx="24" cy="37" rx="4" ry="8"/><ellipse cx="11" cy="24" rx="8" ry="4"/><ellipse cx="37" cy="24" rx="8" ry="4"/><ellipse cx="15" cy="15" rx="4" ry="8" transform="rotate(-45 15 15)"/><ellipse cx="33" cy="15" rx="4" ry="8" transform="rotate(45 33 15)"/><ellipse cx="15" cy="33" rx="4" ry="8" transform="rotate(45 15 33)"/><ellipse cx="33" cy="33" rx="4" ry="8" transform="rotate(-45 33 33)"/></g><circle cx="24" cy="24" r="5" fill="#c99b42"/></svg>';
  var viola = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="#8c6c9b" stroke="#6c527e" stroke-width=".8"><ellipse cx="24" cy="14" rx="7" ry="10"/><ellipse cx="13" cy="24" rx="9" ry="7" transform="rotate(-35 13 24)"/><ellipse cx="35" cy="24" rx="9" ry="7" transform="rotate(35 35 24)"/><ellipse cx="18" cy="34" rx="7" ry="8" transform="rotate(20 18 34)"/><ellipse cx="30" cy="34" rx="7" ry="8" transform="rotate(-20 30 34)"/></g><circle cx="24" cy="25" r="3" fill="#e7c66e"/></svg>';
  var lavender = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 43Q22 24 30 5M22 43Q28 25 37 12" stroke="#71805e" stroke-width="1.8" fill="none"/><g fill="#8e719e"><ellipse cx="27" cy="10" rx="3" ry="5"/><ellipse cx="23" cy="16" rx="3" ry="5"/><ellipse cx="20" cy="22" rx="3" ry="5"/><ellipse cx="35" cy="16" rx="3" ry="5"/><ellipse cx="31" cy="22" rx="3" ry="5"/><ellipse cx="28" cy="28" rx="3" ry="5"/></g></svg>';
  var herb = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 42Q24 25 38 5" stroke="#6f805b" stroke-width="2" fill="none"/><g fill="#8d9a70" stroke="#64744f" stroke-width=".8"><path d="M15 34Q4 24 7 19q10 2 8 13M20 28Q13 15 17 11q9 7 4 17M26 21Q23 9 29 6q6 9-3 17M30 16Q34 5 40 7q1 9-10 12"/></g></svg>';
  var babyBreath = '<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#7c8a69" stroke-width="1.2" fill="none"><path d="M24 43Q21 24 8 9M24 43Q27 22 40 7M23 32Q12 24 8 25"/></g><g fill="#fffdf5" stroke="#c8bca7" stroke-width=".8"><circle cx="8" cy="9" r="3"/><circle cx="40" cy="7" r="3"/><circle cx="8" cy="25" r="3"/><circle cx="24" cy="19" r="3"/><circle cx="31" cy="14" r="2.5"/></g></svg>';
  var strawberry = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 13C12 8 9 20 16 32q8 13 16 0c7-12 4-24-8-19Z" fill="#b7474d" stroke="#8f303c" stroke-width="1.3"/><path d="M24 13q-8-8-12-3 7 0 12 5 5-9 13-6-7-1-13 4" fill="#71805e"/><g fill="#f3d8a1"><circle cx="18" cy="22" r="1"/><circle cx="27" cy="20" r="1"/><circle cx="22" cy="28" r="1"/><circle cx="29" cy="30" r="1"/></g></svg>';
  var berry = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="#783e5d" stroke="#563047" stroke-width=".8"><circle cx="16" cy="23" r="7"/><circle cx="26" cy="18" r="7"/><circle cx="31" cy="29" r="7"/><circle cx="19" cy="34" r="7"/></g><path d="M23 13q1-8 9-8" stroke="#75835c" stroke-width="2" fill="none"/></svg>';
  var citrus = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="#e9b65d" stroke="#b87937" stroke-width="1.5"/><circle cx="24" cy="24" r="13" fill="#f7e2a4" stroke="#fff2cf" stroke-width="1"/><g stroke="#d6a04f" stroke-width="1"><path d="M24 11v26M11 24h26M15 15l18 18M33 15L15 33"/></g><circle cx="24" cy="24" r="2" fill="#fff8e7"/></svg>';
  var fig = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8C8 13 9 34 24 41 39 34 40 13 24 8Z" fill="#8a536b" stroke="#65384f" stroke-width="1.4"/><path d="M24 13Q13 25 24 36Q35 25 24 13Z" fill="#e8b18d"/><g fill="#6e5947"><circle cx="20" cy="24" r="1"/><circle cx="26" cy="21" r="1"/><circle cx="24" cy="29" r="1"/></g></svg>';
  var cherry = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M23 25Q22 8 35 7M27 25Q33 10 35 7" stroke="#71805e" stroke-width="1.6" fill="none"/><circle cx="19" cy="31" r="9" fill="#9b3545"/><circle cx="32" cy="31" r="9" fill="#b44750"/><circle cx="16" cy="28" r="2" fill="#e8a1a0"/><circle cx="29" cy="28" r="2" fill="#e8a1a0"/></svg>';
  var pomegranate = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 9l4 5 7-2-2 7q8 12-1 22H16q-9-10-1-22l-2-7 7 2Z" fill="#a43f4c" stroke="#78313c" stroke-width="1.3"/><path d="M17 23q7-7 14 0v12H17Z" fill="#e6a08b"/><g fill="#8c3446"><circle cx="21" cy="26" r="2"/><circle cx="27" cy="28" r="2"/><circle cx="23" cy="32" r="2"/></g></svg>';
  var gold = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 30L18 8l6 14 8-13 8 26-17-5Z" fill="#c7a454" stroke="#9f7a36" stroke-width="1"/><path d="M18 8l5 22M32 9l-9 21" stroke="#f4df9d" stroke-width="1"/></svg>';
  var pearls = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="#f8f2e6" stroke="#c9bba8" stroke-width="1"><circle cx="13" cy="27" r="5"/><circle cx="25" cy="15" r="4"/><circle cx="34" cy="30" r="6"/><circle cx="22" cy="36" r="3"/></g></svg>';
  var chocolate = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34Q14 4 24 16T40 9M10 39Q18 17 27 27T39 19" fill="none" stroke="#5a382f" stroke-width="4" stroke-linecap="round"/></svg>';
  var pistachio = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="#9ba477" stroke="#69764e" stroke-width="1"><path d="M8 27q8-15 16 0-8 14-16 0Z"/><path d="M23 14q8-15 16 0-8 14-16 0Z"/><path d="M25 35q8-15 16 0-8 14-16 0Z"/></g></svg>';
  var meringue = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 37Q5 29 16 25Q10 15 22 17Q24 4 32 17Q44 20 35 29Q42 39 28 38Z" fill="#fffaf0" stroke="#d7c9b6" stroke-width="1.3"/></svg>';
  var macaron = '<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="28" rx="15" ry="8" fill="#d6a2a0" stroke="#a96f75" stroke-width="1"/><path d="M9 24Q10 10 24 12Q38 10 39 24Z" fill="#e5b9b2" stroke="#a96f75" stroke-width="1"/><path d="M11 24h26" stroke="#fff0dc" stroke-width="3"/></svg>';
  var caramel = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 38L16 7l10 20 8-17 5 28Z" fill="#c68a4d" stroke="#986337" stroke-width="1.3"/><path d="M16 7l10 20M34 10l-8 17" stroke="#f4d29b" stroke-width="1.5"/></svg>';
  var art = {
    "Edible roses":rose,"Daisies":daisy,"Violas":viola,"Lavender":lavender,"Rosemary sprigs":herb,"Baby's breath":babyBreath,
    "Fresh strawberries":strawberry,"Raspberries":berry,"Blueberries":berry,"Figs":fig,"Candied orange":citrus,"Lemon slices":citrus,"Cherries":cherry,"Pomegranate":pomegranate,
    "Gold leaf":gold,"Pearl sprinkles":pearls,"Rainbow sprinkles":pearls,"Chocolate curls":chocolate,"Pistachio crumb":pistachio,"Meringue kisses":meringue,"Macarons":macaron,"Caramel shards":caramel
  };
  return art[item] || gold;
}
function drawDecorations(toppings, count) {
  cakeDecor.innerHTML = "";
  toppings.slice(0, 9).forEach(function (item, index) {
    var holder = svgElement(garnishSvg(item), item);
    holder.style.setProperty("--garnish-index", index);
    cakeDecor.appendChild(holder);
  });
  cakeDecor.classList.toggle("has-decor", toppings.length > 0);
  cakeDecor.style.bottom = (Math.min(240, 140 + count * 12)) + "px";
}
function drawCake() {
  syncLayerOptions();
  var count = Number(layerSlider.value);
  var frostingColour = currentFrostingColour();
  var spongeColour = spongeColours[selectedValue("flavour")] || "#e9c995";
  var fillingName = document.getElementById("filling").value;
  var icingName = document.getElementById("icing").value;
  var shape = document.getElementById("cakeShape").value.toLowerCase();
  var style = document.getElementById("frosting").value;
  cakeTiers.innerHTML = "";
  for (var i = 0; i < count; i++) {
    var tier = document.createElement("div");
    tier.className = "cake-tier " + shape;
    if (style === "Naked cake") tier.className += " naked";
    if (style === "Glossy ganache drip") tier.className += " drip";
    if (style === "Vintage piped") tier.className += " vintage";
    tier.style.setProperty("--frosting", frostingColour);
    tier.style.width = (Math.max(42, 94 - i * 12)) + "%";
    tier.style.zIndex = String(i + 1);
    tier.style.setProperty("--sponge", spongeColour);
    var spongeBand = document.createElement("span");
    spongeBand.className = "cake-sponge-band";
    tier.appendChild(spongeBand);
    if (count > 1 && fillingName !== "None") {
      addBand(tier, "cake-filling-band", fillingColours[fillingName] || "#b45a61");
    }
    if (count > 1 && icingName !== "None") {
      addBand(tier, "cake-icing-band", icingColours[icingName] || "#f7e8cf");
    }
    cakeTiers.appendChild(tier);
  }
  drawDecorations(selectedToppings(), count);
  document.getElementById("layerValue").textContent = count;
  document.getElementById("previewOccasion").textContent = selectedValue("occasion").toUpperCase() + " CAKE";
  updateSummary();
}
function updateSummary() {
  var toppings = selectedToppings();
  var sizeField = document.getElementById("cakeSize");
  var basePrice = Number(sizeField.options[sizeField.selectedIndex].getAttribute("data-price"));
  var flavourInput = cakeForm.querySelector('input[name="flavour"]:checked');
  var flavourExtra = flavourInput ? Number(flavourInput.getAttribute("data-price")) : 0;
  var toppingInputs = cakeForm.querySelectorAll('input[name="topping"]:checked');
  var toppingPrice = 0;
  for (var i = 0; i < toppingInputs.length; i++) toppingPrice += Number(toppingInputs[i].getAttribute("data-price"));
  var tierExtra = Math.max(0, Number(layerSlider.value) - 1) * 55;
  var filling = document.getElementById("filling").value;
  var icing = document.getElementById("icing").value;
  var details = Number(layerSlider.value) + " tiers · " + selectedValue("flavour") + " · Filling: " + filling + " · Between-layer icing: " + icing + " · " + document.getElementById("frosting").value;
  document.getElementById("summaryDetails").textContent = details + (toppings.length ? " · " + toppings.join(", ") : "");
  document.getElementById("estimatedPrice").textContent = "AED " + (basePrice + flavourExtra + toppingPrice + tierExtra).toLocaleString("en");
}
function makeCakeBrief() {
  var toppings = selectedToppings();
  var message = document.getElementById("cakeMessage").value.trim();
  var notes = document.getElementById("extraNotes").value.trim();
  return [
    "BAKERS BEST — CUSTOM CAKE BRIEF",
    "Occasion: " + selectedValue("occasion"),
    "Shape: " + document.getElementById("cakeShape").value,
    "Tiers: " + layerSlider.value,
    "Serving size: " + selectedText("cakeSize"),
    "Sponge: " + selectedValue("flavour"),
    "Filling: " + document.getElementById("filling").value,
    "Between-layer icing: " + document.getElementById("icing").value,
    "Frosting style: " + document.getElementById("frosting").value,
    "Frosting colour: " + currentFrostingColour(),
    "Toppings: " + (toppings.length ? toppings.join(", ") : "No extra toppings selected"),
    "Cake message: " + (message || "None"),
    "Extra notes: " + (notes || "None"),
    "Estimated demo price: " + document.getElementById("estimatedPrice").textContent
  ].join("\n");
}
function showCakeReview() {
  cakeBrief = makeCakeBrief();
  var html = cakeBrief.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
  document.getElementById("modalSummary").innerHTML = html;
  document.getElementById("cakeModal").classList.add("open");
  document.getElementById("cakeModal").setAttribute("aria-hidden", "false");
}
if (cakeForm) {
  cakeForm.addEventListener("change", drawCake);
  cakeForm.addEventListener("input", drawCake);
  document.getElementById("reviewCake").addEventListener("click", showCakeReview);
  customColour.addEventListener("input", function () {
    cakeForm.querySelector('input[name="colour"][value="custom"]').checked = true;
    drawCake();
  });
  drawCake();
}
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("cakeModal").classList.remove("open");
  document.getElementById("cakeModal").setAttribute("aria-hidden", "true");
});
document.getElementById("cakeModal").addEventListener("click", function (event) {
  if (event.target === this) {
    this.classList.remove("open");
    this.setAttribute("aria-hidden", "true");
  }
});
document.getElementById("copyCake").addEventListener("click", function () {
  var message = document.getElementById("copyMessage");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cakeBrief).then(function () {
      message.textContent = "Your cake brief has been copied.";
    }).catch(function () {
      message.textContent = "Copy isn't available in this browser. You can select the summary text above.";
    });
  } else {
    message.textContent = "Copy isn't available in this browser. You can select the summary text above.";
  }
});
