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
let levelDifficulty;



xButton.addEventListener("click", () => {
    xButton.classList.add("selected");
    oButton.classList.remove("selected");
    showDifficulty("x");
});

oButton.addEventListener("click", () => {
    oButton.classList.add("selected");
    xButton.classList.remove("selected");
    showDifficulty("o");
});

xButton.addEventListener("click", () => showDifficulty("x"));
oButton.addEventListener("click", () => showDifficulty("o"));

// Restart Game
restartButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });

    message.classList.remove("show");

    // Reset buttons
    xButton.classList.remove("selected");
    oButton.classList.remove("selected");
    document.querySelectorAll(".difficulty button").forEach((button) => {
        button.classList.remove("selected");
    });

    document.querySelector(".selection").classList.remove("hidden");
    document.querySelector(".difficulty").classList.add("hidden");
    board.classList.add("hidden");

    currentTurn = "x"; // Reset turn
    setBoardHoverClass();
});


// Choose Difficulty
function showDifficulty(choice) {
    humanClass = choice;
    computerClass = humanClass === "x" ? "o" : "x";
    currentTurn = humanClass; // User always starts
    document.querySelector(".selection").classList.add("hidden");
    document.querySelector(".difficulty").classList.remove("hidden");
}

document.getElementById("easy").addEventListener("click", () => {
    setDifficultySelection("easy");
    startGame("easy");
});

document.getElementById("medium").addEventListener("click", () => {
    setDifficultySelection("medium");
    startGame("medium");
});

document.getElementById("hard").addEventListener("click", () => {
    setDifficultySelection("hard");
    startGame("hard");
});

function setDifficultySelection(selectedDifficulty) {
    // Remove 'selected' class from all difficulty buttons
    document.getElementById("easy").classList.remove("selected");
    document.getElementById("medium").classList.remove("selected");
    document.getElementById("hard").classList.remove("selected");

    // Add 'selected' class to the chosen difficulty
    document.getElementById(selectedDifficulty).classList.add("selected");
}


function startGame(level) {
    levelDifficulty = level;
    currentTurn = humanClass; // Ensure user starts first
    cells.forEach((cell) => {
        cell.classList.remove("x", "o");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });

    document.querySelector(".difficulty").classList.add("hidden");
    board.classList.remove("hidden");
    setBoardHoverClass();
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

    let cell;
    if (levelDifficulty === "easy") {
        // Random move
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        cell = availableCells[randomIndex];
    } else if (levelDifficulty === "medium") {
        // Block or win
        cell = findBestMoveMedium(availableCells);
    } else if (levelDifficulty === "hard") {
        // Minimax
        cell = findBestMoveHard();
    }

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

function findBestMoveMedium(availableCells) {
    // Win if possible
    for (let cell of availableCells) {
        cell.classList.add(computerClass);
        if (checkWin(computerClass)) {
            cell.classList.remove(computerClass);
            return cell;
        }
        cell.classList.remove(computerClass);
    }

    // Block the human
    for (let cell of availableCells) {
        cell.classList.add(humanClass);
        if (checkWin(humanClass)) {
            cell.classList.remove(humanClass);
            return cell;
        }
        cell.classList.remove(humanClass);
    }

    // Otherwise, random move
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function findBestMoveHard() {
    let bestScore = -Infinity;
    let bestMove;

    cells.forEach((cell, index) => {
        if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
            cell.classList.add(computerClass);
            let score = minimax(cells, 0, false);
            cell.classList.remove(computerClass);

            if (score > bestScore) {
                bestScore = score;
                bestMove = cell;
            }
        }
    });

    return bestMove;
}

function minimax(cells, depth, isMaximizing) {
    if (checkWin(computerClass)) return 10 - depth;
    if (checkWin(humanClass)) return depth - 10;
    if (isDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        cells.forEach((cell) => {
            if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
                cell.classList.add(computerClass);
                let score = minimax(cells, depth + 1, false);
                cell.classList.remove(computerClass);
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        cells.forEach((cell) => {
            if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
                cell.classList.add(humanClass);
                let score = minimax(cells, depth + 1, true);
                cell.classList.remove(humanClass);
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
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








