let userWins = 0, computerWins = 0;
let invalidFlag = false;

function chooseRPSUser() {
    let userChoice = prompt("Choose your weapon!");
    userChoice = userChoice.toLowerCase();

    return userChoice;
}

function chooseRPSComputer() {
    let randomChoice = Math.round(Math.random() * 2);

    if (randomChoice === 0)
        return 'rock';
    else if (randomChoice === 1)
        return 'paper';
    return 'scissors';
}

function isValid(userChoice) {
    let validChoice = true;
    switch (userChoice) {
        case 'rock':
        case 'paper':
        case 'scissors':
            break;
        
        default:
            validChoice = false;
    }

    return validChoice;
}

let capitalize = weapon => weapon.at(0).toUpperCase() + weapon.slice(1);

function playRound() {
    
    let userChoice = chooseRPSUser();
    if (!isValid(userChoice)) {
        alert("Invalid choice, reload to play again!");
        invalidFlag = true;
        return false;
    }

    let computerChoice = chooseRPSComputer();

    alert(`You chose: ${capitalize(userChoice)}, Computer chose: ${capitalize(computerChoice)}`);

    let winner = "tie";
    if (userChoice === 'rock') {
        if (computerChoice === 'rock') {
            alert("It's a tie!");
        }
        else if (computerChoice === 'paper') {
            alert("You lose!");
            winner = "computer";
        }
        else {
            alert("You win!");
            winner = "user";
        }
    }
    else if (userChoice === 'paper') {
        if (computerChoice === 'paper') {
            alert("It's a tie!");
        }
        else if (computerChoice === 'scissors') {
            alert("You lose!");
            winner = "computer";
        }
        else {
            alert("You win!");
            winner = "user";
        }
    }
    else {
        if (computerChoice === 'scissors') {
            alert("It's a tie!");
        }
        else if (computerChoice === 'rock') {
            alert("You lose!");
            winner = "computer";
        }
        else {
            alert("You win!");
            winner = "user";
        }
    }
    
    return winner;
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        if (invalidFlag === true)
            return;

        let roundWinner = playRound();
        if (roundWinner === 'user')
            userWins++;
        else if (roundWinner === 'computer')
            computerWins++;
        else {
            alert("Rematch!");
            i--;
        }

        alert(`User wins: ${userWins} games. Computer wins: ${computerWins} games.`);
    }

    let victorMessage = "Victor: ";

    victorMessage += (userWins > computerWins) ? "User! " : "Computer! ";
    victorMessage += "Reload to play again."

    alert(victorMessage);
}

playGame();