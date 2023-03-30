/* A game of hangman.
    User will be provided with a number of lives at the start of the game. They will need to guess the string correctly
    Each incorrect input will deduct a life. Each correct word will be added to the user's score.
    The game is over if the user either wins or loses the game. The user wins if they guess a N number of strings.
    The user loses if their lives reach zero or if they reach the maximum number of incorrect guesses
    The game will track of incorrect guesses and remaining lives of the player.*/

//for later: use a difficulty system, where the difficulty of the words changes depending on the user's difficulty
let userHealth = 10;
let winCount = 0;
const incorrectLetters = "";

//queryselectors
const startBtn = document.querySelector(".start-btn");
const flexContainer = document.querySelector(".flex-container");
const instructionsEl = document.querySelector(".instructions");
const userInput = document.querySelector(".user-input");
const dashesContainer = document.querySelector(".dashes-container");
const difficulty = document.querySelector("#difficulty-container");
const trackScore = document.querySelector('.track-winning-score');
const letterContainer = document.querySelector('.letter-container');
const wonMessage = document.querySelector('.won-message-container');
const userEndChoice = document.querySelector('.new-game-popup');
const loseCountCanvas = document.querySelector('.lose-count-canvas');


startBtn.addEventListener('click', function (event) {
    if (event.target) {
        startBtn.classList.add('hidden');

        chooseDifficulty();

    }
});

function chooseDifficulty() {

    instructionsEl.classList.remove('hidden');
    userEndChoice.classList.add('hidden');

    instructionsEl.textContent = 'Choose your difficulty';

    const easyBtn = document.createElement('button');
    const mediumBtn = document.createElement('button');
    const hardBtn = document.createElement('button');

    easyBtn.innerText = 'EASY';
    mediumBtn.innerText = 'MEDIUM';
    hardBtn.innerHTML = 'HARD';

    difficulty.appendChild(easyBtn);
    difficulty.appendChild(mediumBtn);
    difficulty.appendChild(hardBtn);

    difficulty.addEventListener('click', function (event) {
        //depedning on the innertext of the button, generateblocks and randomwords depending on the difficulty array chosen
        if (event.target.innerText === 'EASY') {
            const randomEasyWords = ["apple", "fireworks", "white", "less", "table", "author", "son"];
            loseCountCanvas.classList.remove('hidden');
            instructionsEl.classList.add('hidden');
            difficulty.style.display = 'none';
            generateBlocks();
            generateRandomWord(randomEasyWords);
        }

        if (event.target.innerText === 'MEDIUM') {
            const randomMediumWords = ['argument', 'beautiful', 'branch', 'detail', 'friend'];
            loseCountCanvas.classList.remove('hidden');
            instructionsEl.classList.add('hidden');
            difficulty.style.display = 'none';
            generateBlocks();
            generateRandomWord(randomMediumWords);
        }

        if (event.target.innerText === 'HARD') {
            const randomHardWords = ["askew", "crypt", "dwarves", "fixable"];
            loseCountCanvas.classList.remove('hidden');
            instructionsEl.classList.add('hidden');
            difficulty.style.display = 'none';
            generateBlocks();
            generateRandomWord(randomHardWords);

        }

    })

}

//generate letter blocks
function generateBlocks() {
    //generate the letters
    flexContainer.classList.remove("hidden");
    letterContainer.classList.remove("hidden");

    //generate letter buttons
    for (let i = 65; i < 91; i++) {
        const letter = document.createElement('button');
        letter.textContent = String.fromCharCode(i);
        letter.classList.add("letter-buttons-design");
        //flexContainer.appendChild(letter);
        letterContainer.appendChild(letter);
    }

    //console.log(flexContainer);

}

//this will generate a random word from the array on click
function generateRandomWord(random) {
    let randomWord = Math.floor(Math.random() * random.length);
    let word = "";
    console.log(random)
    if (random.length === 7) {
        for (let i = 0; i < random.length; i++) {
            word = random[randomWord];
        }
    } else if (random.length === 5) {
        for (let i = 0; i < random.length; i++) {
            word = random[randomWord];
        }
    } else if (random.length === 4) {
        for (let i = 0; i < random.length; i++) {
            word = random[randomWord];
        }
    }

    //generate dashes depending on number of random words
    for (let j = 0; j < word.length; j++) {
        const dashes = document.createElement('div');
        dashes.classList.add('dotted-lines');
        dashesContainer.appendChild(dashes);
        dashesContainer.children[j].textContent = word[j];
        dashesContainer.children[j].style.color = 'white';
    }

    //console.log(word);
    //console.log(dashesContainer)
    guess(word);
}

function guess(word) {
    const correctWord = word.split("");
    let letterCount = [];

    console.log(correctWord);

    flexContainer.addEventListener('click', function (event) {
        //console.log(event.target.innerText);
        if (event.target) {
            if (correctWord.includes(event.target.innerText.toLowerCase())) {

                //check if a letter is in an array more than once before disabling the button

                //create a new paragraph element with the text of the correct guessed letter
                const displayLetter = document.createElement('p');
                displayLetter.textContent = event.target.innerText;
                displayLetter.classList.add('letter-design');
                //TODO add html elements. Trying to see if the letter in the dashes container is equal to the index of the correct word and replacing the inner html
                //console.log(dashesContainer);

                for(let i = 0; i < correctWord.length; i++)
                {
                    //TODO check words with duplicate letters
                    if(event.target)
                    {
                        if(correctWord[i] === displayLetter.innerText.toLowerCase())
                        {
                            dashesContainer.children[i].innerText = displayLetter.innerText;
                            dashesContainer.children[i].classList.remove('dotted-lines');
                            dashesContainer.children[i].classList.add('letter-design');
                            dashesContainer.children[i].style.color = 'lightPink';

                            console.log(dashesContainer.children[i]);
                            //keep track of win count and create a new element to display score to the screen
                            winCount += 1;
                            const winScore = document.createElement('p');
                            winScore.setAttribute('class','win-score');
                            console.log(winScore);
                            trackScore.appendChild(winScore);

                            letterCount.push(dashesContainer.children[i].innerText)
                            trackScore.textContent = `Correct Guesses: ${winCount}\nCorrect letters: ${letterCount}`;
                            console.log(letterCount);
                        }
                    }

                }

                event.target.disabled = true;
                console.log(trackScore);

                checkIfWon(correctWord);
                checkIfLose();
                console.log(`Win: ${winCount}\nLose: ${userHealth}`);
            } else {
                userHealth -= 1;
                console.log(`Win: ${winCount}\nLose: ${userHealth}`);
            }

        }

    })
}
// checkIfWon(winCount,correctWord);
// checkIfLost(loseCount,correctWord);

function checkIfWon(correctWord) {
    if (winCount === correctWord.length) {
        //TODO add html elements
        const userWon = document.createElement('h1');
        userWon.textContent = 'YOU WON!';
        // userWon.classList.add('won-message-container');
        //append the element to the won message div
        wonMessage.classList.remove('hidden');
        wonMessage.appendChild(userWon);
        //settimeout for the wonMessage
        setTimeout(hideMessage, 5000);


        console.log("You won!");
    }
}

function checkIfLose() {
    if (userHealth == 0) {
        //TODO add html elements
        console.log("You lost")
    }
}

function hideMessage()
{
    wonMessage.classList.add('hidden');
    resetGame();
}

function resetGame()
{
    const newGameOption = document.createElement('button');
    newGameOption.textContent = 'NEW GAME';
    newGameOption.classList.add('start-btn');

    userEndChoice.appendChild(newGameOption);

    userEndChoice.classList.remove('hidden');

    userEndChoice.addEventListener('click',function(event)
    {
        if(event.target)
        {
            location.reload();
        }

    })
}

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
