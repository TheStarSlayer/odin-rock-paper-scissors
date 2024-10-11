let totalRounds = 0, userWins = 0, computerWins = 0;

const choiceContainer = document.querySelector('.choice');

const possibleUserChoices = document.querySelectorAll('.choice-card');

const roundResultBoard = document.querySelector('div.hidden');

possibleUserChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
        if (!choice.lastElementChild.textContent)
            startRound(choice.id);
    });
});

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
    let notChosenCard = [];

    possibleUserChoices.forEach((choice) => {
        if (userChoice === computerChoice && choice.id === userChoice) {
            choice.lastElementChild.style.color = 'grey';
            choice.lastElementChild.textContent = 'Same choice!';
        }
        else if (userChoice === computerChoice) {
            notChosenCard.push(choice);
        }
        else {
            if (choice.id === userChoice) {
                choice.lastElementChild.style.color = 'green';
                choice.lastElementChild.textContent = 'User\'s choice!';
            }
            else if (choice.id === computerChoice) {
                choice.lastElementChild.style.color = 'red';
                choice.lastElementChild.textContent = 'Computer\'s choice!'
            }
            else {
                notChosenCard.push(choice);
            }
        }
    });

    notChosenCard.forEach((card) => {
        choiceContainer.removeChild(card);
    })
}

function showResults(victor) {
    const resultText = roundResultBoard.firstElementChild;
    switch (victor) {
        case 1:
            resultText.style.color = 'green';
            resultText.textContent = 'User won!';
            break;
        
        case -1:
            resultText.style.color = 'red';
            resultText.textContent = 'Computer won!';
            break;

        case 0:
            resultText.style.color = 'grey';
            resultText.textContent = 'It\'s a tie!';
            break;
    }

    roundResultBoard.classList.remove('hidden');
    roundResultBoard.classList.add('round-result');
}

const nextRound = document.querySelector('#next-round');
nextRound.addEventListener('click', () => {
    roundResultBoard.classList.remove('round-result');
    roundResultBoard.classList.add('hidden');

    possibleUserChoices.forEach((choice) => {
        choice.lastElementChild.textContent = null;
        choiceContainer.appendChild(choice);
    })
});

const endGame = document.querySelector('#end-game');
endGame.addEventListener('click', () => {
    if (userWins > computerWins) {
        alert('User is the winner');
    }
    else if (userWins < computerWins) {
        alert('You lose! Better luck next time!');
    }
    else {
        alert('It\'s a tie!');
    }

    let restartGame = confirm("Wanna play again?");

    if (restartGame) {
        nextRound.dispatchEvent(new Event('click'));
        totalRounds = 0;
        computerWins = 0;
        userWins = 0;
        updateScoreBoard();
    }
    else {
        alert('Goodbye!');
    }
});

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