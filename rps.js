let totalRounds = 0, userWins = 0, computerWins = 0;

const gameContainer = document.querySelector('.game-container');
const choiceContainer = document.querySelector('.choice');
const possibleUserChoices = document.querySelectorAll('.choice-card');
const roundResultBoard = document.querySelector('.round-result');
const gameResult = document.querySelector('.game-over');

// Buttons events start
possibleUserChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
        if (!choice.lastElementChild.textContent)
            startRound(choice.id);
    });
});

const nextRound = document.querySelector('#next-round');
nextRound.addEventListener('click', () => {
    roundResultBoard.classList.add('hidden');

    possibleUserChoices.forEach((choice) => {
        choice.lastElementChild.textContent = null;
        choice.classList.remove('hidden');
    })
});

const endGame = document.querySelector('#end-game');
endGame.addEventListener('click', () => {
    gameContainer.classList.add('hidden');
    gameResult.classList.remove('hidden');

    let gameResultText = gameResult.firstElementChild;
    let dupeGameResultText = gameResultText;
    dupeGameResultText.classList.forEach((cssClass) => {
        gameResultText.classList.remove(cssClass);
    });

    if (userWins > computerWins) {
        gameResultText.classList.add('win');
        gameResultText.textContent = 'User is the winner';
    }
    else if (userWins < computerWins) {
        gameResultText.classList.add('lose');
        gameResultText.textContent = 'You lose! Better luck next time!';
    }
    else {
        gameResultText.classList.add('tie');
        gameResultText.textContent = 'It\'s a tie!';
    }

    document.querySelector('#noOfRoundsScore').textContent = `${totalRounds} rounds`;
    document.querySelector('#userScore').textContent = `${userWins} wins`;
    document.querySelector('#computerScore').textContent = `${computerWins} wins`;
    document.querySelector('#ties').textContent = `${totalRounds - (userWins + computerWins)} ties`;
});

const restartGame = document.querySelector('#restart-game');
restartGame.addEventListener('click', () => {
    nextRound.dispatchEvent(new Event('click'));
    totalRounds = 0;
    computerWins = 0;
    userWins = 0;
    updateScoreBoard();
    gameResult.classList.add('hidden');
    gameContainer.classList.remove('hidden');
});
// Button events end

function chooseRPSComputer() {
    let randomChoice = Math.round(Math.random() * 2);

    if (randomChoice === 0)
        return 'rock';
    else if (randomChoice === 1)
        return 'paper';
    return 'scissors';
}

function decideVictor(userChoice, computerChoice) {
    /*
        Based on userChoice and computerChoice, compute
        the victor.

        Return values:
        --------------------------
        1 : User is winner,
        0 : Tie, and
        -1 : Computer is winner
    */

    let winner = 0;
    if (userChoice === 'rock') {
        if (computerChoice === 'scissors') {
            winner = 1;
        }
        else if (computerChoice === 'paper') {
            winner = -1;
        }
    }
    else if (userChoice === 'paper') {
        if (computerChoice === 'rock') {
            winner = 1;
        }
        else if (computerChoice === 'scissors') {
            winner = -1;
        }
    }
    else {
        if (computerChoice === 'paper') {
            winner = 1;
        }
        else if (computerChoice === 'rock') {
            winner = -1;
        }
    }

    return winner;
}

function updateChosenCards(userChoice, computerChoice) {
    possibleUserChoices.forEach((choice) => {
        let cardChosenBy = choice.lastElementChild;
        let dupeChoice = choice;
        dupeChoice.lastElementChild.classList.forEach((cssClass) => {
            cardChosenBy.classList.remove(cssClass);
        });

        if (userChoice === computerChoice && choice.id === userChoice) {
            cardChosenBy.classList.add('tie');
            cardChosenBy.textContent = 'Same choice!';
        }
        else if (userChoice === computerChoice) {
            choice.classList.add('hidden');
        }
        else {
            if (choice.id === userChoice) {
                cardChosenBy.classList.add('win');
                cardChosenBy.textContent = 'User\'s choice!';
            }
            else if (choice.id === computerChoice) {
                cardChosenBy.classList.add('lose');
                cardChosenBy.textContent = 'Computer\'s choice!'
            }
            else {
                choice.classList.add('hidden');
            }
        }
    });
}

function showResults(victor) {
    const resultText = roundResultBoard.firstElementChild;
    const dupeResultText = resultText;
    dupeResultText.classList.forEach(cssClass => {
        resultText.classList.remove(cssClass);
    });

    switch (victor) {
        case 1:
            resultText.classList.add('win');
            resultText.textContent = 'User won!';
            break;
        
        case -1:
            resultText.classList.add('lose');
            resultText.textContent = 'Computer won!';
            break;

        case 0:
            resultText.classList.add('tie');
            resultText.textContent = 'It\'s a tie!';
            break;
    }

    roundResultBoard.classList.remove('hidden');
}

function updateScoreBoard() {
    const noOfRounds = document.querySelector('#noOfRounds');
    noOfRounds.textContent = String(totalRounds);

    const userWinCount = document.querySelector('#userWins');
    userWinCount.textContent = `${userWins} wins`;

    const computerWinCount = document.querySelector('#computerWins');
    computerWinCount.textContent = `${computerWins} wins`;
}

function startRound(userChoice) {
    let computerChoice = chooseRPSComputer();

    updateChosenCards(userChoice, computerChoice);
    let victor = decideVictor(userChoice, computerChoice);

    if (victor === 1)
        userWins++;
    else if (victor === -1)
        computerWins++;
    totalRounds++;

    showResults(victor);
    updateScoreBoard();
}