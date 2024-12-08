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

// Start Game After User Chooses X or O
xButton.addEventListener("click", () => startGame("x"));
oButton.addEventListener("click", () => startGame("o"));

restartButton.addEventListener("click", () => {
    document.querySelector(".selection").classList.remove("hidden");
    board.classList.add("hidden");
    message.classList.remove("show");
});

function startGame(choice) {
    humanClass = choice;
    computerClass = humanClass === "x" ? "o" : "x";
    currentTurn = "x"; // X always starts
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
    } else {
        winningMessageText.innerText = `${currentTurn === humanClass ? "You Win!" : "Computer Wins!"}`;
    }
    message.classList.add("show");
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

    if (availableCells.length === 0) return; // No moves left

    // Simple AI: Pick a random available cell
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
    }, 500); // Add delay for computer move
}
