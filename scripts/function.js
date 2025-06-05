// Functions

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function randomGreeting(name) {
  const greetings = ["Hello", "Hi", "Servus", "Good evening"];
  const index = Math.round(Math.random() * 3);

  return greetings[index] + ", " + name;
}

const result = randomGreeting("Elex");
