const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const btnReset = document.querySelector('#btnReset');
const paraFinal = document.querySelector('#final-msg');
const paraPlayerScore = document.querySelector('#player-score');
const paraCompScore = document.querySelector('#computer-score');
const message = document.querySelector('#message');

let tie = 0;
let playerWins = 0;
let computerWins = 0;

rock.addEventListener('click', game);
paper.addEventListener('click', game);
scissors.addEventListener('click', game);


function resetTotal() {
    console.log('this button works')
    rock.addEventListener('click', game);
    paper.addEventListener('click', game);
    scissors.addEventListener('click', game);
    message.textContent = '';
    paraFinal.textContent = '';
    paraPlayerScore.textContent = '';
    paraCompScore.textContent = '';
    playerWins = 0;
    computerWins = 0;
    tie = 0;
    let headerDiv = document.getElementById("header-div");
    let btnReset = document.getElementById("btnReset")
    headerDiv.removeChild(btnReset);
}


function game(play) {
    
    let computerPlay = determineComputerPlay();
    let msgRound = singleRound(this.name, computerPlay);
    
    message.textContent = `Player: ${this.name} Computer: ${computerPlay} 
${msgRound}`;

    //console.log(message.textContent)
    if (msgRound.match(/win/i)) {
        playerWins++;
    }
    else if (msgRound.match(/lose/i)) {
        computerWins++;
    }
    else if (msgRound.match(/tie/i)) {
        tie++;
    }
    
    let finalMsg = finalCount(computerWins, playerWins);
    paraFinal.textContent = `${finalMsg}`;
    paraPlayerScore.textContent = `Player: ${playerWins}`;
    paraCompScore.textContent = `Computer: ${computerWins}`;
    
    resetSetup(computerWins, playerWins)
}

function resetSetup(computerWins, playerWins) {
    if (computerWins === 5 || playerWins === 5) {
        rock.removeEventListener('click', game);
        paper.removeEventListener('click', game);
        scissors.removeEventListener('click', game);
        let btnReset = document.createElement("button");
        btnReset.innerText = "Reset";
        btnReset.classList.add('full-width');
        btnReset.id = "btnReset"
        let headerDiv = document.getElementById("header-div");
        headerDiv.appendChild(btnReset);
        btnReset.addEventListener('click', resetTotal)
    }
}

function finalCount(computer, player) {
    if (computer === 5) {
        return `You Lose the Game!`
    }
    else if (player === 5) {
        return `You Win the Game!`
    }
    else {
        return '';
    }
}

function singleRound(play, computer) {
    let playerSelection = play;
    let computerSelection = computer;
//    console.log(computerSelection)
//    console.log(playerSelection)
    let msg = decideWinner(computerSelection, playerSelection);
//    console.log(msg)
    return msg ;
}

function determineComputerPlay() {
    let computerOption = ['rock', 'paper', 'scissors'];
    let x = computerOption[Math.floor(Math.random() * computerOption.length)];
    return x;
}

function decideWinner(computer, player) {
    if (player === 'paper' &
        computer === 'rock') {
        return `You Win this round! ${player} covers ${computer}. `;
    }
    if (player === 'rock' &
        computer === 'scissors') {
        return `You Win this round! ${player} crushes ${computer}. `;
    }
    if (player === 'scissors' &
        computer === 'paper') {
        return `You Win this round! ${player} cuts ${computer}. `;
    }
    if (computer === 'paper' &
        player === 'rock') {
        return `You Lose this round! ${computer} covers ${player}. `
    }
    if (computer === 'rock' &
        player === 'scissors') {
        return `You Lose this round! ${computer} crushes ${player}. `
    }
    if (computer === 'scissors' &
        player === 'paper') {
        return `You Lose this round! ${computer} cuts ${player}. `
    }
    else {
        return 'It\'s a tie! '
    }
}
