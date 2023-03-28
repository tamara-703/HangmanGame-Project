/* A game of hangman.
    User will be provided with a number of lives at the start of the game. They will need to guess the string correctly
    Each incorrect input will deduct a life. Each correct word will be added to the user's score.
    The game is over if the user either wins or loses the game. The user wins if they guess a N number of strings.
    The user loses if their lives reach zero or if they reach the maximum number of incorrect guesses
    The game will track of incorrect guesses and remaining lives of the player.*/

//for later: use a difficulty system, where the difficulty of the words changes depending on the user's difficulty
const randomWords = ["askew", "buffalo", "crypt", "dwarves", "fixable","kettle"];
let userHealth = 10;
const incorrectLetters = "";

//queryselectors
const startBtn = document.querySelector(".start-btn");
const flexContainer = document.querySelector(".flex-container");
const instructionsEl = document.querySelector(".instructions");
const userInput = document.querySelector(".user-input");
const dashesContainer = document.querySelector(".dashes-container");
const difficulty = document.querySelector("#difficulty-container");


startBtn.addEventListener('click', function (event) {
    if (event.target) {
        startBtn.style.visibility = 'hidden';

        instructionsEl.textContent = 'Choose your difficulty';
        instructionsEl.setAttribute('class', 'instructions-design');

        chooseDifficulty();
        generateBlocks(); //put this inside an addeventlistener in the choosedifficulty method

    }
});

function chooseDifficulty()
{
    const easyBtn = document.createElement('button');
    const mediumBtn = document.createElement('button');
    const hardBtn = document.createElement('button');

    easyBtn.innerText = 'EASY';
    mediumBtn.innerText = 'MEDIUM';
    hardBtn.innerHTML = 'HARD';

    difficulty.appendChild(easyBtn);
    difficulty.appendChild(mediumBtn);
    difficulty.appendChild(hardBtn);

    difficulty.addEventListener('click',function(event)
    {
        //depedning on the innertext of the button, generateblocks and randomwords depending on the difficulty array chosen
    })



}

//generate letter blocks
function generateBlocks() {
    //generate the letters
    flexContainer.classList.remove("hidden");

    //generate letter buttons
    for(let i = 65; i < 91; i++)
    {
        const letter = document.createElement('button');
        letter.textContent = String.fromCharCode(i);
        letter.classList.add("dotted-line");
        flexContainer.appendChild(letter);
    }

    console.log(flexContainer);
    //TODO: chooseDifficulty() this will be where the user will select difficulty
    generateRandomWord(); //this will go into the choose difficulty method

}

//this will generate a random word from the array on click
function generateRandomWord() {
    let random = Math.floor(Math.random() * randomWords.length);
    let word = "";

    for (let i = 0; i < randomWords.length; i++) {
        word = randomWords[random];
    }

    console.log(word.length);

    //generate dashes depending on number of random words
    for(let j = 0; j < word.length; j++)
    {
        const dashes = document.createElement('div');
        dashes.classList.add('dotted-lines');
        dashesContainer.appendChild(dashes);
        dashesContainer.children[j].textContent = word[j];
        dashesContainer.children[j].style.color = 'white';
    }

    console.log(word);
    console.log(dashesContainer)
    guess(word);
}

let winCount = 0;

function guess(word)
{
    const correctWord = word.split("");

    console.log(correctWord);

    flexContainer.addEventListener('click',function(event)
    {
        console.log(event.target.innerText);
        if(correctWord.includes(event.target.innerText.toLowerCase()))
        {
            //if(event.target.innerText.toLowerCase().length) //check if a letter is in an array more than once before disabling the button
            event.target.disabled = true;
            const displayLetter = document.createElement('p');
            displayLetter.textContent = event.target.innerText;
            displayLetter.classList.add('letter-design');
            //TODO add html elements. Trying to see if the letter in the dashes container is equal to the index of the correct word and replacing the inner html
            for(let i = 0; i < correctWord.length; i++)
            {
                if(dashesContainer.children[i].innerHTML === correctWord[i])
                {
                    dashesContainer.children[i].innerHTML = displayLetter.textContent;
                }
            }
            winCount += 1;
            checkIfWon(correctWord);
            checkIfLose();
            console.log(`Win: ${winCount}\nLose: ${userHealth}`);
        } else
        {
            userHealth -= 1;
            console.log(`Win: ${winCount}\nLose: ${userHealth}`);
        }
    })
}
    // checkIfWon(winCount,correctWord);
    // checkIfLost(loseCount,correctWord);

function checkIfWon(correctWord)
{
    if(winCount === correctWord.length)
    {
        //TODO add html elements
        console.log("You won!")
    }
}

function checkIfLose()
{
    if(userHealth == 0)
    {
        //TODO add html elements
        console.log("You lost")
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
