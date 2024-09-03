window.addEventListener("load", main);

let baseMaxValue = 100;
let max = baseMaxValue;
let min = 1;
let middle = Math.floor((max + min) / 2);
let attempts = 0;
let wins = 0;
let bestAttempts;
let currentGuess;
let previousGuess;

const resultsList = document.querySelector("#results");

const startBtn = document.querySelector("#startBtn");
const fluff = document.querySelector("#fluff");

function main() {
  console.log("Tal gætteriet kører");
  disableGuesses();
  addEventListeners();
}

function addEventListeners() {
  document.querySelector("#maxValForm").addEventListener("submit", maxValChanged);
  startBtn.addEventListener("click", resetGame);
  document.querySelectorAll(".guessBtn").forEach((button) => {
    button.addEventListener("click", responseGiven);
  });
}

function startGame() {
  document.querySelectorAll(".guessBtn").forEach((button) => (button.disabled = false));
  document.querySelector("#guessContainer").hidden = false;
  startBtn.innerHTML = "Genstart spil";
  makeGuess();
}

function disableGuesses() {
  document.querySelectorAll(".guessBtn").forEach((button) => (button.disabled = true));
}

function binaryGuess(previousGuess) {
  if (previousGuess > 0) {
    max = middle - 1;
  } else if (previousGuess < 0) {
    min = middle + 1;
  }
  tempMiddle = Math.floor((max + min) / 2);
  // Let's add some randomness to the outcome! Add or subtract 10% of the value
  let randomness = Math.random() * tempMiddle * 0.1
  console.log("Pre random",randomness);
  randomness *= Math.random() < 0.5 ? -1 : 1
  let randomTotal = Math.floor(randomness + tempMiddle);
  console.log("Post random",randomness);
  // We only use it if it doesn't break the min / max values
  if (!(randomTotal < min || randomTotal > max)) {
    console.log("Randomness being used");
    middle = randomTotal;
  } else {
    middle = tempMiddle;
  }
  console.log("maxValue is:", max);
  console.log("minValue is:", min);
  console.log("middle is:", middle);

  if (max < min) {
    console.error("Something went wrong");
    return -1;
  }

  return middle;
}

function makeGuess(feedback) {
  currentGuess = binaryGuess(feedback);
  if (currentGuess == min) {
    console.log("currentGuess == min");
    document.querySelector("#highGuess").disabled = true;
  }
   if (currentGuess == max) {
    console.log("currentGuess == max");
    document.querySelector("#lowGuess").disabled = true;
  }

  document.querySelector("#computerGuess").innerHTML = currentGuess;
  if (!previousGuess){
    previousGuess = currentGuess;
  }

  incrementAttempts();

  if (max == min) {
    gameFinished(true)
  }

  return currentGuess;
}

function maxValChanged(event) {
  event.preventDefault();
  const newVal = event.target.maxValueInput.valueAsNumber;
  if (baseMaxValue != newVal) {
    baseMaxValue = newVal;
    max = baseMaxValue;
    document.querySelector("#maxValue").innerHTML = baseMaxValue;
    resetGame();
  }
}

function responseGiven(e) {
  const response = e.target.dataset.response;
  console.log(response);

  if (response == "high") {
    outputAnswer(`Jeg gættede på ${previousGuess}, men det var for højt`);
    makeGuess(1);
  } else if (response == "low") {
    outputAnswer(`Jeg gættede på ${previousGuess}, men det var for lavt`);
    makeGuess(-1);
  }
  else if (response == "correct") {
    gameFinished();
  }

  previousGuess = currentGuess;
}


function incrementAttempts() {
  attempts++;
  updateAttempts();
}

function gameFinished(forceWin) {
  console.log("game won!");

  if (forceWin) {
    outputAnswer(`Jeg gættede på ${currentGuess}, og ved at det er korrekt, fordi der ikke er andre muligheder`);
  } else {
    outputAnswer(`Jeg gættede på ${currentGuess}, og det var korrekt!`);
  }

  startBtn.addEventListener("click", restartClicked);
  disableGuesses();
  incrementWins();
  updateBestAttempts();
}

function restartClicked(e) {
  e.target.removeEventListener("click", restartClicked);
  resetGame();
}

function resetGame() {
  resultsList.innerHTML = "";
  fluff.innerHTML = ""
  attempts = 0;
  max = baseMaxValue;
  min = 1;
  updateAttempts();
  startGame();
}

function outputAnswer(message) {
  resultsList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}

function incrementWins(){
    wins++;
    updateWins()
}

function updateWins() {
  document.querySelector("#wins").innerHTML = wins;
}

function updateBestAttempts(){
  if (!bestAttempts || attempts < bestAttempts) {
    bestAttempts = attempts;
    console.log("best attempts:",bestAttempts);
    fluff.innerHTML = ("Yes! A new highscore for least amount of attempts")
    document.querySelector("#best-attempts").innerHTML = bestAttempts;
  }
  else {
    fluff.innerHTML = attempts < 3 ? "Nice! That was fast" : attempts < 5 ? "Decent enough" : "Well that was slow"
  }
}

function updateAttempts() {
  document.querySelector("#attempts").innerHTML = attempts;
}
