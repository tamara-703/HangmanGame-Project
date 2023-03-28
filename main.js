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
    const incorrectGuesses = document.querySelector(".incorrect-counter");



    startBtn.addEventListener('click',function (event)
    {
        if(event.target)
        {
            startBtn.style.visibility = 'hidden';

            instructionsEl.textContent = 'Player turn: enter a letter';
            instructionsEl.setAttribute('class','instructions-design');

            generateWord();
        }
    });

    //this will generate a random word from the array on click
    function generateWord()
    {
        let random = Math.floor(Math.random() * randomWords.length);
        let word = "";

        for(let i = 0; i < randomWords.length; i++)
        {
            word = randomWords[random];
        }

        generateBlocks(word);

    }

    //this will generate number of blocks depending on the length of the word
    function generateBlocks(word)
    {
        const arrayOfLines = []; //stores empty boxes, number dependent on how many letters there are in the random word
        const correctWord = word.split(""); //stores the correct word
        // const form = document.createElement('form');

        console.log(correctWord);

        for(let i = 0; i < word.length; i++)
        {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('dotted-lines');
            arrayOfLines.push(input);

            flexContainer.appendChild(arrayOfLines[i]);
        }

        // form.setAttribute('class','form-list');

        // arrayOfLines.forEach(element =>
        //     form.appendChild(element));

        decrementHealth(correctWord,arrayOfLines);

    }

    function decrementHealth(correctWord, arrayOfLines)
    {

        const submitBtn = document.createElement('button');
        submitBtn.classList.add('submit-button');
        submitBtn.textContent = 'submit';
        flexContainer.appendChild(submitBtn);

        for(let i = 0; i < arrayOfLines.length; i++)
        {
            arrayOfLines[i].addEventListener('input',function(event)
            {
                if(event.target)
                {
                    flexContainer.addEventListener('click',function(event)
                    {
                        if(event.target)
                        {
                            if(arrayOfLines[i].value !== correctWord[i])
                            {
                                console.log("incorrect word");
                                submitBtn.style.visibility = 'hidden';
                                userHealth -= 1;
                                console.log(userHealth);
                                incorrectGuesses.innerHTML = arrayOfLines[i].value.charAt(0);
                                console.log(incorrectGuesses);
                                console.log("Incorrect guesses: " + incorrectGuesses);

                            }
                        }
                    })
                }

            })
        }

    }

    function checkGuess()
    {

    }
