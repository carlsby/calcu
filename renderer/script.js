// Inputen som visar tal + tecken osv (den enda inputen lol)
let display = document.getElementById("display");

// Kollar ifall display börjar med en 0 och du lägger till en ny siffra. t.ex om du skriver in 02 så rättas det till 2
function checkForZeroInBeginning() {
  if (
    display.value.startsWith("0") &&
    display.value.length > 1 &&
    !display.value.includes(",") &&
    !isNaN(display.value)
  ) {
    display.value = display.value.slice(1);
  }
}

// Lägger till vald tecken/nummer till inputen
function appendToDisplay(value) {
  // Tillåter bara ett kommatecken åt gången
  if (value === "," && display.value.includes(",")) {
    return;
  }

  display.value += value;
  checkForZeroInBeginning();
}

// Rensar skärmen
function clearDisplay() {
  display.value = "";
}

// Minus ett
function backstepDisplay() {
  display.value = display.value.slice(0, -1);
}

// Beräkna resultat
function calculateResult() {
  try {
    // Javascript vill bara använda punkter, inte kommatecken ????? Internationellt????
    let expression = display.value.replace(/,/g, "."); // Ersätter alla kommatecken med regex

    let result = eval(expression);

    // Efter uträkning, gör om punkter till kommatecken igen för att visa upp, regex shit
    display.value = result.toString().replace(/\./g, ",");
  } catch (error) {
    display.value = "Error";
  }
}

// Ändrar ifall talet är plus eller minus
function negate() {
  let currentValue = display.value;

  if (currentValue === "") return;

  if (currentValue.startsWith("-")) {
    display.value = currentValue.substring(1);
  } else {
    display.value = "-" + currentValue;
  }
}

// Ifall användare trycker på enter, kalla på calculateResult
display.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculateResult();
  }
});

// Kollar efter 0 i början när man skriver själv istället för knappar
display.addEventListener("input", (event) => {
  event.preventDefault();
  checkForZeroInBeginning();
});

// Tar bort så inte mellanslag gör något för jag råkade trycka på den hela tiden, tar även bort .
display.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    event.preventDefault();
  } else if (event.key === ".") {
    event.preventDefault();
  }
});

// Eventlyssnare för att man alltid ska kunna skriva, utan att behöva trycka på inputen
document.addEventListener("keydown", function (event) {
  if (event.key >= "0" && event.key <= "9") {
    appendToDisplay(event.key);
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/" ||
    event.key === ","
  ) {
    appendToDisplay(event.key);
  } else if (event.key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    backstepDisplay();
  } else if (event.key === "Escape") {
    event.preventDefault();
    clearDisplay();
  }
});
