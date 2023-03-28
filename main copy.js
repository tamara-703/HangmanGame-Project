/* A game of hangman.
    User will be provided with a number of lives at the start of the game. They will need to guess the string correctly
    Each incorrect input will deduct a life. Each correct word will be added to the user's score.
    The game is over if the user either wins or loses the game. The user wins if they guess a N number of strings.
    The user loses if their lives reach zero or if they reach the maximum number of incorrect guesses
    The game will track of incorrect guesses and remaining lives of the player.*/

//for later: use a difficulty system, where the difficulty of the words changes depending on the user's difficulty
const randomWords = ["askew", "buffalo", "crypt", "dwarves", "fixable"];
let userHealth = 10;
const incorrectLetters = "";

//queryselectors
const startBtn = document.querySelector(".start-btn");
const flexContainer = document.querySelector(".flex-container");
const instructionsEl = document.querySelector(".instructions");
const userInput = document.querySelector(".user-input");


startBtn.addEventListener('click', function (event) {
    if (event.target) {
        startBtn.style.visibility = 'hidden';

        instructionsEl.textContent = 'Player turn: enter a letter';
        instructionsEl.setAttribute('class', 'instructions-design');

        generateBlocks();
    }
});

//this will generate number of blocks depending on the length of the word
function generateBlocks() {
    //generate the letters
    flexContainer.classList.remove("hidden");
    //flexContainer.classList.add("visible");
    // for (let i = 0; i < flexContainer.childElementCount; i++) {
    //     flexContainer.children[i].classList.add("dotted-lines")
    // }

    for(let i = 65; i < 91; i++)
    {
        const letter = document.createElement('button');
        letter.textContent = String.fromCharCode(i);
        letter.classList.add("dotted-line");
        flexContainer.appendChild(letter);
    }

    console.log(flexContainer)
    generateRandomWord();

}

//this will generate a random word from the array on click
function generateRandomWord() {
    let random = Math.floor(Math.random() * randomWords.length);
    let word = "";

    for (let i = 0; i < randomWords.length; i++) {
        word = randomWords[random];
    }

    console.log(word);
    guess(word);
}

let winCount = 0;
let loseCount = 0;

function guess(word)
{
    const correctWord = word.split("")

    console.log(correctWord);

    flexContainer.addEventListener('click',function(event)
    {
        if(event.target)
        {
            for(let i = 0; i < correctWord.length; i++)
            {
                if(event.target.innerText === correctWord[i])
                {
                    winCount += 1;
                    console.log("Correct letter!")
                }
            }
        }

    })

    // checkIfWon(winCount,correctWord);
    // checkIfLost(loseCount,correctWord);


}

function checkIfWon(winCount,correctWord)
{
    if(winCount.sort() === correctWord.sort())
    {
        console.log("You won!")
    }
}







// arrayOfLines[i].addEventListener('input',function(event)
//     {

//             if(event.target !== correctWord[i])
//             {
//                 decrementHealth(arrayOfLines[i]);
//             } else
//             {
//                 correctGuess(arrayOfLines[i],correctWord[i]);
//             }
//         })


function decrementHealth(incorrectLine) {


    console.log("incorrect letter " + incorrectLine.value);
    userHealth -= 1;
    console.log(userHealth);
    incorrectGuesses.innerHTML = incorrectLine.value.charAt(0);
    console.log(incorrectGuesses);
    console.log("Incorrect guesses: " + incorrectGuesses);
}




function correctGuess(correctLine, correctWord) {
    console.log(`Your guess ${correctLine.value} matches ${correctWord.value}`);

}
