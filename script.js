window.addEventListener("load", main);

let baseMaxValue = 100;
let max = baseMaxValue;
let min = 1;
let middle = Math.floor((max + min) / 2);
let attempts = 0;
let wins = 0;
let currentGuess;
let previousGuess;

const resultsList = document.querySelector("#results");

const startBtn = document.querySelector("#startBtn");

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
  middle = Math.floor((max + min) / 2);
  console.log("maxValue is:", max);
  console.log("minValue is:", min);
  console.log("middle is:", middle);

  if (max < min) {
    return -1;
  }
  else if (max == min) {
    console.log("only one option left!");
    
  }
  return middle;
}

function makeGuess(feedback) {
  currentGuess = binaryGuess(feedback);
  if (currentGuess != -1) {
    console.log("current guess isn't -1");
    if (currentGuess == min){
      document.querySelector("#highGuess").disabled = true
    }
    else if (currentGuess == max) {
      document.querySelector("#lowGuess").disabled = true;
    }
    document.querySelector("#computerGuess").innerHTML = currentGuess;
    if (!previousGuess){
      previousGuess = currentGuess;
    }
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
      makeGuess(1);
  } else if (response == "low") {
    makeGuess(-1);
  }
  else if (response == "correct") {
    gameFinished();
  }
}
// function responseGiven(e) {
//   const response = e.target.dataset.response;
//   console.log(response);
//   let forceWin = false;

//   if (response == "high") {
//     if (previousGuess == min) {
//       forceWin = true;
//     } else {
//       const result = makeGuess(1);
//       if (result > 0) {
//         previousGuess = currentGuess
//         outputAnswer(`Jeg gættede på ${previousGuess}, men det var for højt`);
//         incrementAttempts()
//       } else {
//         forceWin = true;
//       }
//     }
//   } else if (response == "low") {
//     if (previousGuess == max) {
//       forceWin = true;
//     }
//     const result = makeGuess(-1);
//     if (result > 0) {
//       previousGuess = currentGuess;
//       outputAnswer(`Jeg gættede på ${previousGuess}, men det var for lavt`);
//       incrementAttempts()
//     } else {
//       forceWin = true;
//     }
//   }
//   if (response == "correct" || forceWin) {
//     gameFinished(forceWin);
//   }
// }

function incrementAttempts() {
  attempts++;
  updateAttempts();
}

function gameFinished(forceWin) {
  console.log("game won!");

  if (forceWin) {
    outputAnswer(`Jeg gættede på ${previousGuess}, og ved at det er korrekt, fordi der ikke er andre muligheder`);
  } else {
    incrementAttempts();
    previousGuess = currentGuess;
    outputAnswer(`Jeg gættede på ${previousGuess}, og det var korrekt!`);
  }

  startBtn.addEventListener("click", restartClicked);
  disableGuesses();
  wins++;
  updateWins(attempts);
}

function restartClicked(e) {
  e.target.removeEventListener("click", restartClicked);
  resetGame();
}

function resetGame() {
  resultsList.innerHTML = "";
  attempts = 0;
  max = baseMaxValue;
  min = 1;
  updateAttempts();
  startGame();
}

function outputAnswer(message) {
  resultsList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}

function updateWins(currentAttempts = attempts) {
  document.querySelector("#wins").innerHTML = wins;
  document.querySelector("#best-attempts").innerHTML = currentAttempts;
}

function updateAttempts() {
  document.querySelector("#attempts").innerHTML = attempts;
}
