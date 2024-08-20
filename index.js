// Get references to DOM elements
var nextNumber = document.getElementById("next-number");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");
var nextButton = document.getElementById("next-button");
var difficulty = document.getElementById("difficulty-level");
var hint = document.getElementById("hint");
var tries = 0;
var totalTries = 0;
var win = 0;
var numbers = [];
var randomFunctions = [
  addSquares,
  twiceAdded,
  subtractCube,
  cubedAdd,
  fibonacci,
  exponential_one,
  exponential_two,
  exponential_three,
  exponential_four,
  log_e,
];
var timer;
var timeLeft = 60;
var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Function to generate a sequence based on squares
function addSquares() {
  var randomFirst = Math.floor(Math.random() * 9) + 1;
  numbers.push(randomFirst);
  for (var i = 0; i < 5; i++) {
    numbers.push(numbers[i] + Math.pow(i + 1, 2));
  }
  hint.innerHTML = "Think of squares";
  difficulty.innerText = "Difficulty: Easy";
}

// Function to generate a sequence by adding twice the previous number plus the index
function twiceAdded() {
  var randomFirst = Math.floor(Math.random() * 9) + 1;
  numbers.push(randomFirst);
  for (var i = 0; i < 5; i++) {
    numbers.push(2 * numbers[i] + (i + 1));
  }
  hint.innerHTML = "Think of numbers doubled";
  difficulty.innerText = "Difficulty: Easy";
}

// Function to generate a sequence with subtraction of cubes
function subtractCube() {
  var randomFirst = Math.floor(Math.random() * 3) + 1;
  for (i = randomFirst; i < randomFirst + 5; i++) {
    numbers.push(Math.pow(i + 1, 3) - (i + 1));
  }
  hint.innerHTML = "Try raising to the 3rd power";
  difficulty.innerText = "Difficulty: Medium";
}

// Function to generate a sequence by adding cubes and products
function cubedAdd() {
  var randomFirst = Math.floor(Math.random() * 3) + 1;
  for (i = randomFirst; i < randomFirst + 5; i++) {
    numbers.push(Math.pow(i + 1, 3) + (i + 2) * (i + 3));
  }
  hint.innerHTML = "Think of cubes";
  difficulty.innerText = "Difficulty: Medium";
}

// Function to generate a Fibonacci sequence
function fibonacci() {
  var randomFirst = Math.floor(Math.random() * 9) + 1;
  numbers.push(randomFirst);
  for (var i = 0; i < 5; i++) {
    if (i === 0) {
      numbers.push(randomFirst + 0);
    } else {
      numbers.push(numbers[i - 1] + numbers[i]);
    }
  }
  hint.innerHTML = "Think of Fibonacci sequence";
  difficulty.innerText = "Difficulty: Easy";
}

// Function to generate a sequence with exponential growth
function exponential_one() {
  var x = Math.floor(Math.random() * 20) + 1;
  let term = (n) => Math.pow(1 + x / n, n);
  for (let i = 0; i <= 5; i++) {
    let num = toFixed(term(i), 2);
    numbers.push(num);
  }
  hint.innerHTML = "What do you know about exponential series?";
  difficulty.innerText = "Difficulty: Hard";
}

// Function to generate a sequence with negative powers
function exponential_two() {
  var n = Math.floor(Math.random() * 5) + 1;
  let term = (i) => Math.pow(-1, n) * Math.pow(i, n);
  for (let i = 0; i < 5; i++) {
    numbers.push(term(i));
  }
  hint.innerHTML = "Look again, think in powers";
  difficulty.innerText = "Difficulty: Hard";
}

// Function to generate a sequence with a number raised to the index and divided by the index
function exponential_three() {
  let randomnum = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < 5; i++) {
    let power = i + 1;
    let value = Math.pow(randomnum, power) / power;
    let rounded = toFixed(value, 2);
    numbers.push(rounded);
  }
  hint.innerHTML = "A number is raised to the index and divided by the index";
  difficulty.innerText = "Difficulty: Hard";
}

// Function to generate a sequence with exponential decay
function exponential_four() {
  let randomnum = Math.random() * 5 + 1;
  for (let i = 0; i < 5; i++) {
    let value = Math.exp(-1 / Math.pow(randomnum + i, 2));
    let rounded = toFixed(value, 2);
    numbers.push(rounded);
  }
  hint.innerHTML = "An exponential of a number";
  difficulty.innerText = "Difficulty: Hard";
}

// Function to generate a sequence with logarithms
function log_e() {
  let randomnum = Math.random() * 10 + 1;
  for (let i = 0; i < 5; i++) {
    let value = Math.log(randomnum + i);
    numbers.push(toFixed(value, 2));
  }
  hint.innerHTML =
    "Find out a random number added to index and try some log on it";
  difficulty.innerText = "Difficulty: Hard";
}

// Function to round a number to a fixed number of decimal places
function toFixed(num, precision) {
  return (+(Math.round(+(num + "e" + precision)) + "e" + -precision)).toFixed(
    precision,
  );
}

// Function to call a random pattern function from the array
function callRandomFunction() {
  const randomIndex = Math.floor(Math.random() * randomFunctions.length);
  randomFunctions[randomIndex]();
}

// Function to create and append a span element to the display
function createSpan(element) {
  var span = document.createElement("span");
  span.innerHTML = element;
  display.appendChild(span);
}

// Function to display the pattern of numbers
function displayPattern() {
  numbers.slice(0, -1).map((element) => createSpan(element));
}

// Function to handle the user's guess
function guess() {
  tries++;
  totalTries++;
  document.getElementById("total-tries").innerHTML = totalTries;

  if (tries == 3) {
    nextButton.style.display = "inline-block";
  }

  if (nextNumber.value == numbers[numbers.length - 1]) {
    win++;
    document.getElementById("wins").innerHTML = win;
    result.innerHTML = "You win!";
    result.style.color = "#74d900";
    hint.innerHTML = "";
    setTimeout(function () {
      nextPattern();
      nextNumber.value = "";
    }, 1000);
  } else {
    if (tries >= 3) {
      hint.style.display = "block";
    }
    result.innerHTML = "Nope, try again";
    result.style.color = "#d90074";
  }
}

// Add event listener for Enter key press to submit guess
nextNumber.onkeypress = function (event) {
  if (event.which == 13 || event.keyCode == 13) {
    guess();
    return false;
  }
  return true;
};

// Function to start a new pattern
function nextPattern() {
  tries = 0;
  result.innerHTML = "";
  hint.style.display = "none";
  document.getElementById("display-pattern").innerHTML = "";
  numbers = [];
  nextButton.style.display = "none";
  callRandomFunction();
  displayPattern();
  startTimer();
}

//Hide How-To Instructions
document.getElementById("hide-instructions").onclick = function(e) {
  e.preventDefault;
  document.getElementById("how-to-container").classList.toggle("hidden")
}

  // Function to start the timer
  function startTimer() {
    timeLeft = 60;
    timer = setInterval(function () {
      var minutes = Math.floor(timeLeft / 60);
      var seconds = timeLeft % 60;
      document.getElementById("timer").innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
        result.innerHTML = "Time's up!";
        result.style.color = "#d90074";
        nextButton.style.display = "inline-block";
      }
    }, 1000);
  }

  // Start the game with the first pattern
  nextPattern();