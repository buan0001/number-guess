window.addEventListener("load", main);

let maxValue = 100;
let attempts = 0;
let wins = 0;
let currentGuess;

const resultsList = document.querySelector("#results");

const startBtn = document.querySelector("#startBtn");

// main()

// function main(){
//     const values = [21,22,23,25,27,28,29,31,32,34,35];
//     console.log("Finding the index for the value 33 in the array", values)
//     const indexResult = binarySearch(22, values)
//     console.log("The index was: ",indexResult);
    
// }

// function binarySearch(search, values){
//     let min = 0
//     let max = values.length
//     let middle;
    
//     while (min <= max) {
//     // for (let index = 0; index < 10; index++) {
    

//         middle = Math.floor((max + min) / 2)
//         console.log("max is:",max);
//         console.log("min is:",min);
//         console.log("middle is:",middle);
        
//         const comparison = compare( values[middle], search)
//         if (comparison > 0) {
//             max = middle - 1
//         }
//         else if (comparison < 0) {
//             min = middle + 1
//             // break;
//         }
//         // if (min <= max) {middle = -1; break;}
//         else if (comparison == 0) {return middle;}
//         // else if (comparison == 0) {found = true; break;}
//     }
//     return -1
// }

// function compare( arrayValue, search) {
//     return  arrayValue - search
// }

function main() {
  console.log("Tal gætteriet kører");
  disableGuesses();
  addEventListeners();
}

function addEventListeners() {
  document.querySelector("#maxValForm").addEventListener("submit", maxValChanged);
  startBtn.addEventListener("click", resetGame);
  document.querySelectorAll(".guessBtn").forEach(button => {
    button.addEventListener("click", responseGiven);
  });
}



function startGame() {
  document.querySelectorAll(".guessBtn").forEach(button => (button.disabled = false));
  document.querySelector("#guessContainer").hidden = false;
  startBtn.innerHTML = "Genstart spil";
  makeGuess();
}

function disableGuesses() {
  document.querySelectorAll(".guessBtn").forEach(button => (button.disabled = true));
}

function makeGuess() {
    // TODO: Make more intelligent guesses
  currentGuess = Math.floor(Math.random() * maxValue) + 1;
  document.querySelector("#computerGuess").innerHTML = currentGuess;
}

function maxValChanged(event) {
  event.preventDefault();
  const newVal = event.target.maxValueInput.valueAsNumber;
  if (maxValue != newVal) {
    maxValue = newVal
    document.querySelector("#maxValue").innerHTML = maxValue;
    resetGame();
  }
}

function responseGiven(e) {
  const response = e.target.dataset.response;
  console.log(response);

  if (response == "high") {
    outputAnswer(`Jeg gættede på ${currentGuess}, men det var for højt`);
    makeGuess();
  } else if (response == "low") {
    outputAnswer(`Jeg gættede på ${currentGuess}, men det var for lavt`);
    makeGuess();
  } else if (response == "correct") {
    outputAnswer(`Jeg gættede på ${currentGuess}, og det var korrekt!`);
    startBtn.addEventListener("click", restartClicked);
    disableGuesses();
    wins++;
    updateWins();
  } else {
    console.log("Something went wrong with the response:", response);
  }
  attempts++;
  updateAttempts();
}

function compareTo(guess) {
  return guess - magicNumber;
}

function restartClicked(e) {
  e.target.removeEventListener("click", restartClicked);
  resetGame();
}

function resetGame() {
  resultsList.innerHTML = "";
  attempts = 0;
  updateAttempts();
  startGame();
}

function outputAnswer(message) {
  resultsList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}

function updateWins() {
  document.querySelector("#wins").innerHTML = wins;
}

function updateAttempts() {
  document.querySelector("#attempts").innerHTML = attempts;
}
