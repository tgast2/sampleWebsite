document.addEventListener('DOMContentLoaded', fetchStats);

const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const winningMessageText = document.getElementById("winningMessageText");
const restartButton = document.getElementById("restartButton");
const message = document.querySelector(".message");
const xButton = document.getElementById("chooseX");
const oButton = document.getElementById("chooseO");

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let humanClass;
let computerClass;
let currentTurn;



xButton.addEventListener("click", () => startGame("x"));
oButton.addEventListener("click", () => startGame("o"));

restartButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.classList.remove("x", "o");
    });

    message.classList.remove("show");

    document.querySelector(".selection").classList.remove("hidden");
    board.classList.add("hidden");
});

function startGame(choice) {
    humanClass = choice;
    computerClass = humanClass === "x" ? "o" : "x";
    currentTurn = "x";

    cells.forEach((cell) => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });

    document.querySelector(".selection").classList.add("hidden");
    board.classList.remove("hidden");
    setBoardHoverClass();

    if (currentTurn === computerClass) {
        computerMove();
    }
}




function handleClick(e) {
    const cell = e.target;
    const currentClass = currentTurn;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        if (currentTurn === computerClass) {
            computerMove();
        }
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = "Draw!";
        updateGameStatistics(0, 0); // No one wins
    } else {
        if (currentTurn === humanClass) {
            winningMessageText.innerText = "You Win!";
            updateGameStatistics(1, 0); // User wins
        } else {
            winningMessageText.innerText = "Computer Wins!";
            updateGameStatistics(0, 1); // Computer wins
        }
    }
    message.classList.add("show");

    fetchStats();
}



function isDraw() {
    return [...cells].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentTurn = currentTurn === "x" ? "o" : "x";
}

function setBoardHoverClass() {
    board.classList.remove("x", "o");
    board.classList.add(currentTurn);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function computerMove() {
    const availableCells = [...cells].filter(
        (cell) => !cell.classList.contains("x") && !cell.classList.contains("o")
    );

    if (availableCells.length === 0) return;


    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cell = availableCells[randomIndex];

    setTimeout(() => {
        placeMark(cell, computerClass);
        if (checkWin(computerClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }, 500);
}

restartButton.addEventListener("click", () => {

    cells.forEach((cell) => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });


    message.classList.remove("show");


    currentTurn = "x";


    setBoardHoverClass();
});

function updateGameStatistics(userWon, computerWon) {
    fetch('http://localhost:3000/api/update-statistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_won: userWon,
            computer_won: computerWon
        })
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            fetchStats();
        })
        .catch(error => console.error('Error updating statistics:', error));
}



function fetchStats() {
    fetch('http://localhost:3000/api/gamestats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalGames').innerText = `Total Games: ${data.totalGames}`;
            document.getElementById('userWins').innerText = `User Wins: ${data.userWins}`;
            document.getElementById('computerWins').innerText = `Computer Wins: ${data.computerWins}`;
        })
        .catch(error => console.error('Error fetching stats:', error));
}








