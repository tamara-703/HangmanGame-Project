//queryselectors
const startBtn = document.querySelector(".start-btn");
const flexContainer = document.querySelector(".flex-container");
const instructionsEl = document.querySelector(".instructions");
const dashesContainer = document.querySelector(".dashes-container");
const difficulty = document.querySelector("#difficulty-container");
const trackScore = document.querySelector('.track-winning-score');
const letterContainer = document.querySelector('.letter-container');
const statusMessage = document.querySelector('.status-message-container');
const userEndChoice = document.querySelector('.new-game-popup');
const loseCanvas = document.querySelector('.lose-count-canvas');
const hintMessage = document.querySelector('.hint');

//global variables
let userHealth = 10;
let winCount = 0;
let ctx = loseCanvas.getContext("2d");
let wrongGuesses = 0;


startBtn.addEventListener('click', function (event) {
    if (event.target) {
        startBtn.classList.add('hidden');

        chooseDifficulty();

    }
});

/* This function will create three difficulty button that the user can choose from.
    An array of random words will be chosen depending on the chosen difficulty*/
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

    difficulty.children[0].classList.add("green-btn");
    difficulty.children[1].classList.add("yellow-btn");
    difficulty.children[2].classList.add("red-btn");

    difficulty.addEventListener('click', function (event) {
        //depedning on the innertext of the button, generateblocks and randomwords depending on the difficulty array chosen
        if (event.target.innerText === 'EASY') {
            const randomEasyWords = ["apple", "fireworks", "white", "less", "table", "author", "son", "animal", "staff", "jelly", "beekeeper"];
            loseCanvas.classList.remove('hidden');
            initialCanvas();
            instructionsEl.classList.add('hidden');
            difficulty.style.display = 'none';
            difficulty.children[0].classList.add('hover-green');
            generateBlocks();
            generateRandomWord(randomEasyWords);
        }

        if (event.target.innerText === 'MEDIUM') {
            const randomMediumWords = ['argument', 'beautiful', 'branch', 'detail', 'friend', 'blizzard', 'cycle', 'voodoo'];
            loseCanvas.classList.remove('hidden');
            initialCanvas();
            instructionsEl.classList.add('hidden');
            difficulty.style.display = 'none';
            generateBlocks();
            generateRandomWord(randomMediumWords);
        }

        if (event.target.innerText === 'HARD') {
            const randomHardWords = ["askew", "crypt", "dwarves", "fixable", "boggle", "exodus", "gossip", "nightclub", "pneumonia", "jazz", "frazzled", "awkward"];
            loseCanvas.classList.remove('hidden');
            initialCanvas();
            instructionsEl.classList.add('hidden');
            difficulty.style.display = 'none';
            generateBlocks();
            generateRandomWord(randomHardWords);

        }

    })

}

/* This function will generate the 24-alphabet letters as buttons */
function generateBlocks() {
    //display container that will hold the letter buttons
    flexContainer.classList.remove("hidden");
    letterContainer.classList.remove("hidden");

    //generate letter buttons
    for (let i = 65; i < 91; i++) {
        const letter = document.createElement('button');
        letter.textContent = String.fromCharCode(i);
        letter.classList.add("letter-buttons-design");

        letterContainer.appendChild(letter);
    }

}

//this will generate a random word from the array on click
function generateRandomWord(random) {

    let randomWord = Math.floor(Math.random() * random.length);
    let word = "";

    if (random.length === 11) {
        for (let i = 0; i < random.length; i++) {
            word = random[randomWord];
        }
    } else if (random.length === 8) {
        for (let i = 0; i < random.length; i++) {
            word = random[randomWord];
        }
    } else if (random.length === 12) {
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

    guess(word);
}

function guess(word) {
    const correctWord = word.split("");
    let letterCount = [];


    console.log(correctWord);

    letterContainer.addEventListener('click', function (event) {

        const displayLetter = document.createElement('p');
        displayLetter.textContent = event.target.innerText;
        displayLetter.classList.add('letter-design');

        let found = false;

        if (event.target) {
            for (let i = 0; i < correctWord.length; i++) {

                if (correctWord[i] === displayLetter.innerText.toLowerCase()) {

                    found = true;
                    dashesContainer.children[i].innerText = displayLetter.innerText;
                    dashesContainer.children[i].classList.remove('dotted-lines');
                    dashesContainer.children[i].classList.add('letter-design');
                    dashesContainer.children[i].style.color = 'lightPink';

                    //keep track of win count and create a new element to display score to the screen
                    winCount += 1;
                    const winScore = document.createElement('p');
                    winScore.setAttribute('class', 'win-score');

                    trackScore.appendChild(winScore);

                    letterCount.push(dashesContainer.children[i].innerText);
                    trackScore.textContent = `Correct Guesses: ${winCount}\nCorrect letters: ${letterCount}`;

                    event.target.disabled = true;
                }

            }
        }


        checkIfWon(correctWord);

        if (found == false) {
            userHealth -= 1;

            wrongGuesses += 1;
            console.log(wrongGuesses)

            event.target.disabled = true;
            console.log(userHealth);
            drawCanvas(userHealth);

        }


        if (wrongGuesses > 3) {
            wrongGuesses = 0;
            requestHint(correctWord, dashesContainer);
        }

    })
}

function requestHint(correctWord, dashesContainer) {

    const hintBtn = document.createElement('button');
    let randomLetter = "";
    let notIncluded = [];
    hintBtn.textContent = 'HINT?';
    hintBtn.classList.add('start-btn');

    hintMessage.classList.remove('hidden');
    hintMessage.appendChild(hintBtn);

    hintBtn.addEventListener('click', function (event) {
        if (event.target) {
            hintMessage.classList.add('hidden');
            hintMessage.firstElementChild.remove();

            for (let j = 0; j < correctWord.length; j++) {
                if (correctWord[j] === dashesContainer.children[j].innerText)
                {
                    notIncluded.push(dashesContainer.children[j].innerText);

                }

            }

            for (let i = 0; i < notIncluded.length; i++) {
                randomLetter = notIncluded[i];
            }

            for (let y = 0; y < dashesContainer.childElementCount; y++) {
                if (randomLetter === dashesContainer.children[y].innerText) {
                    dashesContainer.children[y].innerText = randomLetter.toUpperCase();
                    dashesContainer.children[y].classList.remove('dotted-lines');
                    dashesContainer.children[y].classList.add('letter-design');
                    dashesContainer.children[y].style.color = 'lightPink';

                    for (let i = 0; i < letterContainer.childElementCount; i++) {
                        if(randomLetter === letterContainer.children[i].innerText.toLowerCase())
                        {
                            letterContainer.children[i].disabled = true; //disable chosen button
                        }
                    }
                    winCount++;
                }
            }


        }

        checkIfWon(correctWord);

    })

}

function checkIfWon(correctWord) {
    if (winCount === correctWord.length) {
        const userWon = document.createElement('h1');
        userWon.textContent = 'YOU WON!';
        userWon.style.color = 'green';

        statusMessage.classList.remove('hidden');
        statusMessage.appendChild(userWon);

        //settimeout for the wonMessage
        setTimeout(hideMessage, 5000);
    }
}

//create a method that will be used once we draw each of the hangman's lines
const drawLine = (fromX, fromY, toX, toY) => {
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
};

function initialCanvas() {
    //bottom line
    drawLine(10, 130, 250, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 200, 10);
    //noose line
    drawLine(70, 10, 70, 40);
}

function drawCanvas(userHealth) {

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    switch (userHealth) {
        //draw head
        case 9:
            ctx.beginPath();
            ctx.arc(70, 50, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            break;
        //draw body
        case 8:
            drawLine(70, 60, 70, 100);
            break;
        //left arm
        case 7:
            //drawLine(70, 50, 50, 70);
            drawLine(70, 80, 50, 70);
            break;
        //right arm
        case 6:
            //drawLine(70, 50, 90, 70);
            drawLine(70, 80, 90, 70);
            break;
        //left leg
        case 5:
            //drawLine(70, 80, 50, 110);
            drawLine(70, 100, 50, 110);
            break;
        //right leg
        case 4:
            drawLine(70, 100, 90, 110);
            break;
        //left eye
        case 3:
            //ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
            ctx.arc(65, 50, 2, 0, Math.PI * 2, true);
            //ctx.moveTo(95, 65);
            ctx.stroke();
            break;
        //right eye
        case 2:
            //ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
            ctx.arc(75, 50, 2, 0, Math.PI * 2, true);
            ctx.stroke();
            break;
        //sad mouth
        case 1:
            // ctx.arc(75, 75, 35, 0, Math.PI, false);
            ctx.arc(70, 60, 5, 0, Math.PI, true);
            ctx.stroke();
            userHealth -= 1;

            checkIfLose(userHealth);
            break;


    }

}

function checkIfLose(userHealth) {

    if (userHealth === 0) {
        const userLost = document.createElement('h1');
        userLost.textContent = 'YOU LOST';
        userLost.style.color = 'darkred';

        statusMessage.classList.remove('hidden');
        statusMessage.appendChild(userLost);
        
        //settimeout for the wonMessage
        setTimeout(hideMessage, 5000);
    }

}

function hideMessage() {
    statusMessage.classList.add('hidden');
    resetGame();
}

function resetGame() {

    const newGameOption = document.createElement('button');
    newGameOption.textContent = 'NEW GAME';
    newGameOption.classList.add('start-btn');

    userEndChoice.appendChild(newGameOption);

    userEndChoice.classList.remove('hidden');

    userEndChoice.addEventListener('click', function (event) {
        if (event.target) {
            location.reload();
        }

    })
}
