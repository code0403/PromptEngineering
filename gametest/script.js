// script.js
const choices = document.querySelectorAll('.choice');
const result = document.getElementById('result');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const drawsElement = document.getElementById('draws');
const quitButton = document.getElementById('quit');
const finalWinnerElement = document.getElementById('final-winner');

let playerScore = 0;
let computerScore = 0;
let draws = 0;
let isGameOver = false;

choices.forEach(choice => {
    choice.addEventListener('click', playGame);
});

quitButton.addEventListener('click', quitGame);

function playGame(e) {
    if (isGameOver) {
        return;
    }
  
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    updateScore(winner);
    showResult(playerChoice, computerChoice, winner);
    checkGameOver();
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    } else {
        draws++;
    }
    playerScoreElement.textContent = `Player: ${playerScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
    drawsElement.textContent = `Draws: ${draws}`;
}

function showResult(playerChoice, computerChoice, winner) {
    result.innerHTML = `
        You chose <strong>${playerChoice}</strong>.
        The computer chose <strong>${computerChoice}</strong>.
        <br><br>
        <strong>${winner === 'draw' ? "It's a draw!" : winner === 'player' ? 'You win!' : 'Computer wins!'}</strong>
    `;
}

function checkGameOver() {
    const totalRounds = playerScore + computerScore + draws;
    if (totalRounds === Infinity) {
        isGameOver = true;
        quitButton.disabled = false;
        choices.forEach(choice => {
            choice.removeEventListener('click', playGame);
        });
        const finalWinner = getFinalWinner();
        finalWinnerElement.textContent = `Final Winner: ${finalWinner}`;
        finalWinnerElement.style.display = 'block';
    }
}

function getFinalWinner() {
    if (playerScore > computerScore) {
        return 'Player';
    } else if (computerScore > playerScore) {
        return 'Computer';
    } else {
        return 'It\'s a tie!';
    }
}

function quitGame() {
    isGameOver = true;
    choices.forEach(choice => {
        choice.removeEventListener('click', playGame);
    });
    quitButton.removeEventListener('click', quitGame);
    result.textContent = "Game over. Thank you for playing!";
    finalWinnerElement.textContent = "";
    resetScores();
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    draws = 0;
    playerScoreElement.textContent = 'Player: 0';
    computerScoreElement.textContent = 'Computer: 0';
    drawsElement.textContent = 'Draws: 0';
    finalWinnerElement.style.display = 'none';
}
