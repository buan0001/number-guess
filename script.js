window.addEventListener("load",main)

let maxValue = 100
let magicNumber;
let attempts = 0
let wins = 0;

const resultsList = document.querySelector("#results")



function main() {
    console.log("Tal gætteriet kører");
    newRandomNumber()
    document.querySelector("#guessr").addEventListener("submit", guessMade)
    document.querySelector("#maxValForm").addEventListener("submit", maxValChanged)
}
function newRandomNumber() {
    magicNumber = Math.floor(Math.random()*maxValue)
    document.querySelector("#secret").innerHTML = magicNumber
    
}
function maxValChanged(event) {
    event.preventDefault()
    maxValue = event.target.maxValueInput.valueAsNumber
    document.querySelector("#maxValue").innerHTML = maxValue
    restartGame()
}

function guessMade(e) {
    e.preventDefault();
    console.log(e.target.guess.value);
    
    const guess = e.target.guess.valueAsNumber
    console.log("guess " + guess);
    
    const compVal = compareTo(guess)
    console.log("comp val",compVal);
    
    if (compVal < 0) {
        outputAnswer(`Du gættede på ${guess}. Det var for lavt`)
        console.log("For lavt");
    }
    else if (compVal > 0) {
        outputAnswer(`Du gættede på ${guess}. Det var for højt`)
        console.log("For højt");
        
    }
    else if (compVal == 0) {
        outputAnswer(`Du gættede på ${guess}. Det var korrekt! Spillet genstarter kortvarigt`)
        setTimeout(() => {
            restartGame()
        }, 3000);
    }
    attempts++
    updateAttempts()
}

function compareTo(guess){
    return guess - magicNumber
}

function restartGame() {
    newRandomNumber()
    resultsList.innerHTML = "";
    attempts = 0
    wins++
    updateWins()
    updateAttempts()
}

function outputAnswer(message){
    
    resultsList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`)
}

function updateWins(){
    document.querySelector("#wins").innerHTML = wins;
}

function updateAttempts(){
    document.querySelector("#attempts").innerHTML = attempts
}
